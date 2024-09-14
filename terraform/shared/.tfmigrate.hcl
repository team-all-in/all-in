tfmigrate {
  migration_dir = "./tfmigrate"
  history {
    storage "s3" {
      bucket = "tfaction-sandbox-naruse666-tfmigrate-history"
      key    = "terraform/shared/history.json"
    }
  }
}
