resource "aws_apprunner_service" "all_in_api" {
  service_name = "all_in"

  source_configuration {
    image_repository {
      image_configuration {
        port = "8000"
      }
      image_identifier      = "${aws_ecr_repository.all_in_api.repository_url}:latest"
      image_repository_type = "ECR"
    }
    auto_deployments_enabled = true
  }

  tags = {
    Name = "all-in-apprunner-service"
  }
}
