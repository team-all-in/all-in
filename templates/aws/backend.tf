terraform {
  backend "s3" {
    bucket = "all-in-tfaction-backend"
    key    = "%%TARGET%%/v1/terraform.tfstate"
    region = "ap-northeast-1"
  }
}
