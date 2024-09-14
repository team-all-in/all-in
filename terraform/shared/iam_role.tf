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
      "ecr:BatchCheckLayerAvailability"
    ]
    effect    = "Allow"
    resources = []
  }
}

resource "aws_iam_policy" "ecr" {
  name   = "All_In_Backend_API_CI_Policy"
  policy = data.aws_iam_policy_document.ecr.json
}

resource "aws_iam_role_policy_attachment" "ecr" {
  role       = aws_iam_role.terraform_plan.name
  policy_arn = aws_iam_policy.ecr.arn
}
