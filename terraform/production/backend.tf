terraform {
  backend "s3" {
    bucket = "tfaction-sandbox-naruse666-backend"
    key    = "terraform/production/v1/terraform.tfstate"
    region = "ap-northeast-1"
  }
}
