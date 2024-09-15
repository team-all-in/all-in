data "aws_ssm_parameter" "openai_api_key" {
  name = "openai_api_key"
}

data "aws_ssm_parameter" "all_in_key" {
  name = "all-in-key"
}

data "aws_ssm_parameter" "all_in_iv" {
  name = "all-in-iv"
}

data "aws_ssm_parameter" "slack_app_token" {
  name = "slack_app_token"
}

data "aws_ssm_parameter" "slack_bot_token" {
  name = "slack_bot_token"
}

data "aws_ssm_parameter" "slack_refresh_token" {
  name = "slack_refresh_token"
}

data "aws_ssm_parameter" "discord_secret_id" {
  name = "discord_secret_id"
}
