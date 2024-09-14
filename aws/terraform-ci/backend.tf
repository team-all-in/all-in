terraform {
  backend "s3" {
    bucket = "all-in-tfaction-backend"
    key    = "aws/terraform-ci/v1/terraform.tfstate"
    region = "ap-northeast-1"
  }
}
