locals {
  prefix = "all-in"
}

data "tls_certificate" "github" {
  url = "https://token.actions.githubusercontent.com/.well-known/openid-configuration"
}

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  thumbprint_list = [data.tls_certificate.github.certificates[0].sha1_fingerprint]
  client_id_list  = ["sts.amazonaws.com"]
}

resource "aws_s3_bucket" "backend" {
  bucket = "${local.prefix}-tfaction-backend"
}
resource "aws_s3_bucket" "tfmigrate-history" {
  bucket = "${local.prefix}-tfaction-tfmigrate-history"
}



module "aws" {
  source = "github.com/suzuki-shunsuke/terraform-aws-tfaction?ref=v0.2.2"

  name                             = "AWS"
  repo                             = "team-all-in/all-in"
  main_branch                      = "main"
  s3_bucket_tfmigrate_history_name = aws_s3_bucket.backend.id
  s3_bucket_terraform_state_name   = aws_s3_bucket.tfmigrate-history.id
}

resource "aws_iam_role_policy_attachment" "terraform_apply_admin" {
  role       = module.aws.aws_iam_role_terraform_apply_name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_role_policy_attachment" "terraform_plan_readonly" {
  role       = module.aws.aws_iam_role_terraform_plan_name
  policy_arn = "arn:aws:iam::aws:policy/ReadOnlyAccess"
}

resource "aws_iam_role_policy_attachment" "tfmigrate_plan_readonly" {
  role       = module.aws.aws_iam_role_tfmigrate_plan_name
  policy_arn = "arn:aws:iam::aws:policy/ReadOnlyAccess"
}

resource "aws_iam_role_policy_attachment" "tfmigrate_apply_readonly" {
  role       = module.aws.aws_iam_role_tfmigrate_apply_name
  policy_arn = "arn:aws:iam::aws:policy/ReadOnlyAccess"
}
