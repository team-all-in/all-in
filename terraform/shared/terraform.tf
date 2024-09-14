terraform {
  required_version = ">= 1.0"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-northeast-1"
}

data "terraform_remote_state" "all_in_env" {
  backend = "s3"

  config = {
    bucket = "all-in-tfaction-backend"
    key    = "terraform/env/v1/terraform.tfstate"
    region = "ap-northeast-1"
  }
}
