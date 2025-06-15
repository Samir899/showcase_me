terraform {
  backend "s3" {
    bucket         = "your-tfstate-bucket"
    key            = "infra/${terraform.workspace}/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-lock"
    encrypt        = true
  }
}
