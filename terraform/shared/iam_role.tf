# CI/CD用のrole
data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:team-all-in/all-in:*"]
    }

    principals {
      type        = "Federated"
      identifiers = ["arn:aws:iam::451153100141:oidc-provider/token.actions.githubusercontent.com"]
    }
  }
}


resource "aws_iam_role" "ecr" {
  assume_role_policy    = data.aws_iam_policy_document.assume_role_policy.json
  force_detach_policies = false
  max_session_duration  = 3600
  name                  = "All_In_Backend_API_CI"
}

data "aws_iam_policy_document" "ecr" {
  statement {
    actions   = ["ecr:GetAuthorizationToken"]
    effect    = "Allow"
    resources = ["*"]
  }
  statement {
    actions = [
      "ecr:UploadLayerPart",
      "ecr:PutImage",
      "ecr:InitiateLayerUpload",
      "ecr:CompleteLayerUpload",
      "ecr:BatchCheckLayerAvailability",
      "ssm:DescribeParameters",
      "ssm:GetParameter",
      "ssm:PutParameter",
      "apprunner:StartDeployment",
    ]
    effect = "Allow"
    resources = [
      data.terraform_remote_state.all_in_env.outputs.ecr_arn,
      data.terraform_remote_state.all_in_env.outputs.slack_ecr_arn,
      data.terraform_remote_state.all_in_env.outputs.discord_ecr_arn,
      data.aws_ssm_parameter.slack_bot_token.arn,
      data.aws_ssm_parameter.slack_refresh_token.arn,
      "arn:aws:apprunner:ap-northeast-1:451153100141:service/all_in_slack/a1d29e5b95024ae9bd54357249909875", #all_in_slack data resourceないから直指定
    ]
  }
}

resource "aws_iam_policy" "ecr" {
  name   = "All_In_Backend_API_CI_Policy"
  policy = data.aws_iam_policy_document.ecr.json
}

resource "aws_iam_role_policy_attachment" "ecr" {
  role       = aws_iam_role.ecr.name
  policy_arn = aws_iam_policy.ecr.arn
}
