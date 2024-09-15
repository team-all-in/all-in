output "ecr_arn" {
  value       = aws_ecr_repository.all_in_api.arn
  description = "ecr repository arn for image push CI"
}

output "slack_ecr_arn" {
  value       = aws_ecr_repository.all_in_api_slack.arn
  description = "slckal ecr repository arn for image push CI"
}
