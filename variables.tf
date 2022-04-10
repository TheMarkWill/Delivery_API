variable "gcp_project_id" {
  default = ""
}

variable "gcp_key_file" {
  default = ""
}

variable "gcp_region" {
  default = "us-east4"
}

variable "gcp_zone" {
  default = "us-east4-a"
}

variable "gcp_project_image" {
  default = ""
}

variable "service_name" {
  default = ""
}

variable "domain_service" {
  default = ""
}

variable "NODE_ENV" {
  default = "no-production"
}

variable "ENV_DATABASE_URL" {
  default = ""
}

variable "ENV_TOKEN_CLIENT_JWT" {
  default = ""
}

variable "ENV_TOKEN_DELIVERYMAN_JWT" {
  default = ""
}

variable "ENV_NEW_RELIC_LICENSE_KEY" {
  default = ""
}

variable "ENV_NEW_RELIC_APP_NAME" {
  default = ""
}