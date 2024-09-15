data "aws_ssm_parameter" "openai_api_key" {
  name = "openai_api_key"
}

data "aws_ssm_parameter" "all_in_key" {
  name = "all-in-key"
}

data "aws_ssm_parameter" "all_in_iv" {
  name = "all-in-key"
}
