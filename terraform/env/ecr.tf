resource "aws_ecr_repository" "all_in_api" {
  name                 = "all_in_api"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_lifecycle_policy" "all_in_api" {
  repository = aws_ecr_repository.all_in_api.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last 30 images",
            "selection": {
                "tagStatus": "tagged",
                "tagPrefixList": ["v"],
                "countType": "imageCountMoreThan",
                "countNumber": 30
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}
