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

resource "aws_ecr_repository" "all_in_api_slack" {
  name                 = "all_in_api_slack"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_lifecycle_policy" "all_in_api_slack" {
  repository = aws_ecr_repository.all_in_api_slack.name

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

resource "aws_ecr_repository" "all_in_api_discord" {
  name                 = "all_in_api_discord"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_lifecycle_policy" "all_in_api_discord" {
  repository = aws_ecr_repository.all_in_api_discord.name

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
