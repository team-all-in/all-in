resource "aws_apprunner_service" "all_in_api_discord" {
  service_name = "all_in_discord"

  source_configuration {
    authentication_configuration {
      access_role_arn = aws_iam_role.discord_access.arn
    }
    image_repository {
      image_configuration {
        port = "8000"
        runtime_environment_variables = {
          SUPABASE_URL      = "https://cajjmsopjzveypmycwqe.supabase.co"
          SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhamptc29wanp2ZXlwbXljd3FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNDY5ODgsImV4cCI6MjA0MTgyMjk4OH0.JrXfH8vNCla4BzoWVbV6IUPOyrg5PoN239qslbb567Q"
        }
        runtime_environment_secrets = {
          OPENAI_API_KEY    = data.aws_ssm_parameter.openai_api_key.arn
          KEY               = data.aws_ssm_parameter.all_in_key.arn
          IV                = data.aws_ssm_parameter.all_in_iv.arn
          DISCORD_BOT_TOKEN = data.aws_ssm_parameter.discord_bot_token.arn
        }
      }
      image_identifier      = "${aws_ecr_repository.all_in_api_discord.repository_url}:latest"
      image_repository_type = "ECR"
    }
    auto_deployments_enabled = true
  }

  instance_configuration {
    cpu               = "0.25 vCPU"
    memory            = "0.5 GB"
    instance_role_arn = aws_iam_role.discord_app_runner_ssm_role.arn
  }

  tags = {
    Name = "discord-all-in-apprunner-service"
  }
}

data "aws_iam_policy_document" "discord_access" {
  statement {
    sid = "ReadPrivateEcr"
    actions = [
      "ecr:BatchGetImage",
      "ecr:DescribeImages",
      "ecr:GetDownloadUrlForLayer",
    ]
    resources = [aws_ecr_repository.all_in_api_discord.arn]
  }

  statement {

    sid = "AuthPrivateEcr"
    actions = [
      "ecr:DescribeImages",
      "ecr:GetAuthorizationToken",
      "ssm:DescribeParameters",
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "discord_access" {
  name   = "apprunner-access-ecr-discord"
  policy = data.aws_iam_policy_document.discord_access.json
}

resource "aws_iam_role_policy_attachment" "discord_access" {
  policy_arn = aws_iam_policy.discord_access.arn
  role       = aws_iam_role.discord_access.name
}

resource "aws_iam_role" "discord_access" {
  name               = "discord-apprunner_access_role"
  assume_role_policy = data.aws_iam_policy_document.access_assume_role.json
}

# for ssm parameter store
resource "aws_iam_role" "discord_app_runner_ssm_role" {
  name = "discord-app_runner_ssm_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "tasks.apprunner.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "discord_attach_ssm_policy" {
  role       = aws_iam_role.discord_app_runner_ssm_role.name
  policy_arn = aws_iam_policy.ssm_get_parameters_policy.arn
}
