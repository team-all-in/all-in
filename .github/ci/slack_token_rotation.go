package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	netUrl "net/url"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/ssm"
)

type slackTokenResponse struct {
	Ok           bool   `json:"ok"`
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	Error        string `json:"error"`
}

// get refresh token
func getRefreshToken(ctx context.Context, cfg aws.Config) (token string, err error) {
	input := &ssm.GetParameterInput{
		Name:           aws.String("slack_refresh_token"),
		WithDecryption: aws.Bool(true),
	}
	client := ssm.NewFromConfig(cfg)

	parameter, err := client.GetParameter(ctx, input)
	if err != nil {
		return "", fmt.Errorf("get refresh token: %s", err)
	}

	return aws.ToString(parameter.Parameter.Value), nil
}

// rotation request to slack OAuth
func refreshToken(refreshToken string) (slackResponse slackTokenResponse, err error) {
	clientId := os.Getenv("SLACK_CLIENT_ID")
	clientSecret := os.Getenv("SLACK_CLIENT_SECRET")
	url := "https://slack.com/api/oauth.v2.access"

	data := netUrl.Values{}
	data.Set("client_id", clientId)
	data.Set("client_secret", clientSecret)
	data.Set("grant_type", "refresh_token")
	data.Set("refresh_token", refreshToken)

	req, err := http.NewRequest("POST", url, strings.NewReader(data.Encode()))
	if err != nil {
		return slackResponse, err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return slackResponse, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return slackResponse, err
	}

	err = json.Unmarshal(body, &slackResponse)
	if err != nil {
		return slackResponse, fmt.Errorf("marshal slack response. %s", err)
	}
	return slackResponse, nil
}

// set new access token to ssm parameter store
func setToken(ctx context.Context, cfg aws.Config, token, refreshToken string) error {
	botInput := &ssm.PutParameterInput{
		Name:      aws.String("slack_bot_token"),
		Value:     &token,
		Overwrite: aws.Bool(true),
	}

	refreshInput := &ssm.PutParameterInput{
		Name:      aws.String("slack_refresh_token"),
		Value:     &refreshToken,
		Overwrite: aws.Bool(true),
	}

	client := ssm.NewFromConfig(cfg)

	// bot
	_, err := client.PutParameter(ctx, botInput)
	if err != nil {
		return fmt.Errorf("put bot token err %s", err)
	}

	// refresh
	_, err = client.PutParameter(ctx, refreshInput)
	if err != nil {
		return fmt.Errorf("put refresh token err %s", err)
	}

	return nil
}

func main() {
	ctx := context.TODO()
	cfg, err := config.LoadDefaultConfig(ctx, config.WithRegion("ap-northeast-1"))
	if err != nil {
		fmt.Printf("failed to load SDK config. %s\n", err)
		os.Exit(1)
	}

	token, err := getRefreshToken(ctx, cfg)
	if err != nil {
		fmt.Printf("failed to get refresh token: %s\n", err)
	}

	refresh, err := refreshToken(token)
	if err != nil {
		fmt.Printf("failed to %s\n", err)
		os.Exit(1)
	}
	if refresh.Error != "" {
		fmt.Printf("failed to refresh token.\n%s", refresh.Error)
		os.Exit(1)
	}

	err = setToken(ctx, cfg, refresh.AccessToken, refresh.RefreshToken)
	if err != nil {
		fmt.Printf("failed to set token\n%s", err)
		os.Exit(1)
	}
	os.Exit(0)
}
