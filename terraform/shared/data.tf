data "aws_ssm_parameter" "slack_bot_token" {
  name = "slack_bot_token"
}

data "aws_ssm_parameter" "slack_refresh_token" {
  name = "slack_refresh_token"
}
