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
      }
      image_identifier      = "${aws_ecr_repository.all_in_api.repository_url}:latest"
      image_repository_type = "ECR"
    }
    auto_deployments_enabled = true
  }

  instance_configuration {
    cpu    = "0.5 vCPU"
    memory = "1 GB"
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
