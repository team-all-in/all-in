output "ecr_arn" {
  value       = aws_ecr_repository.all_in_api.arn
  description = "ecr repository arn for image push CI"
}
