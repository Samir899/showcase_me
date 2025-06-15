# infra/terraform/modules/oidc/main.tf
module "github_oidc" {
  source = "terraform-module/github-oidc-provider/aws"
  version = "~> 1"
  create_oidc_provider = true
  create_oidc_role     = true
  repositories         = ["Samir899/showcase_me:main"]
  oidc_role_attach_policies = [
    "arn:aws:iam::aws:policy/AmazonEC2FullAccess",
    "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  ]
}
