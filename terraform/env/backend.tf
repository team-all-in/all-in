terraform {
  backend "s3" {
    bucket = "all-in-tfaction-backend"
    key    = "terraform/env/v1/terraform.tfstate"
    region = "ap-northeast-1"
  }
}
