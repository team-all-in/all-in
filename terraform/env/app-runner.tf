data "aws_partition" "current" {}

resource "aws_apprunner_service" "all_in_api" {
  service_name = "all_in"

  source_configuration {
    authentication_configuration {
      access_role_arn = aws_iam_role.access.arn
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
      image_identifier      = "${aws_ecr_repository.all_in_api.repository_url}:latest"
      image_repository_type = "ECR"
    }
    auto_deployments_enabled = true
  }

  instance_configuration {
    cpu               = "0.25 vCPU"
    memory            = "0.5 GB"
    instance_role_arn = aws_iam_role.app_runner_ssm_role.arn
  }

  tags = {
    Name = "all-in-apprunner-service"
  }
}

data "aws_iam_policy_document" "access_assume_role" {

  statement {
    sid     = "AccessAssumeRole"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["build.apprunner.${data.aws_partition.current.dns_suffix}"]
    }
  }
}

data "aws_iam_policy_document" "access" {
  statement {
    sid = "ReadPrivateEcr"
    actions = [
      "ecr:BatchGetImage",
      "ecr:DescribeImages",
      "ecr:GetDownloadUrlForLayer",
    ]
    resources = [aws_ecr_repository.all_in_api.arn]
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

resource "aws_iam_policy" "access" {
  name   = "apprunner-access-ecr"
  policy = data.aws_iam_policy_document.access.json
}

resource "aws_iam_role_policy_attachment" "access" {
  policy_arn = aws_iam_policy.access.arn
  role       = aws_iam_role.access.name
}

resource "aws_iam_role" "access" {
  name               = "apprunner_access_role"
  assume_role_policy = data.aws_iam_policy_document.access_assume_role.json
}

# for ssm parameter store
resource "aws_iam_role" "app_runner_ssm_role" {
  name = "app_runner_ssm_role"

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

resource "aws_iam_policy" "ssm_get_parameters_policy" {
  name = "SSMGetParametersPolicy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "ssm:GetParameters"
        ]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach_ssm_policy" {
  role       = aws_iam_role.app_runner_ssm_role.name
  policy_arn = aws_iam_policy.ssm_get_parameters_policy.arn
}
