terraform {
  backend "s3" {
    bucket = "all-in-tfaction-backend"
    key    = "terraform/shared/v1/terraform.tfstate"
    region = "ap-northeast-1"
  }
}
