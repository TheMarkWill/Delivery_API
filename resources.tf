resource "google_project_service" "gcp_resource_manager_api" {
  service = "cloudresourcemanager.googleapis.com"
}
resource "google_project_service" "compute_api" {
  service = "compute.googleapis.com"
}
resource "google_project_service" "run_api" {
  service = "run.googleapis.com"

  disable_on_destroy = true
}

resource "google_cloud_run_service" "create_cloud_run" {
  name                       = var.service_name
  location                   = var.gcp_region
  autogenerate_revision_name = true


  template {
    spec {
      container_concurrency = local.settings.containerConcurrency
      timeout_seconds       = local.settings.timeoutSeconds
      containers {
        image = var.gcp_project_image

        resources {
          limits = {
            cpu    = local.settings.maxCPU
            memory = local.settings.maxMemory
          }
        }

        env {
          name  = "NODE_ENV"
          value = var.NODE_ENV
        }
        env {
          name  = "DATABASE_URL"
          value = var.ENV_DATABASE_URL
        }
        env {
          name  = "TOKEN_CLIENT_JWT"
          value = var.ENV_TOKEN_CLIENT_JWT
        }
        env {
          name  = "TOKEN_DELIVERYMAN_JWT"
          value = var.ENV_TOKEN_DELIVERYMAN_JWT
        }
        env {
          name  = "NEW_RELIC_LICENSE_KEY"
          value = var.ENV_NEW_RELIC_LICENSE_KEY
        }
        env {
          name  = "NEW_RELIC_LICENSE_KEY"
          value = var.ENV_NEW_RELIC_LICENSE_KEY
        }
        env {
          name  = "NEW_RELIC_APP_NAME"
          value = var.ENV_NEW_RELIC_APP_NAME
        }
        env {
          name  = "NEW_RELIC_DISTRIBUTED_TRACING_ENABLED"
          value = true
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = local.settings.maxScale
        "autoscaling.knative.dev/minScale" = local.settings.minScale
      }
    }
  }

  metadata {
    labels = {
      project     = var.service_name
      environment = var.NODE_ENV
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  lifecycle {
    ignore_changes = [
      metadata.0.annotations,
      metadata.0.labels
    ]
  }

}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.create_cloud_run.location
  project  = google_cloud_run_service.create_cloud_run.project
  service  = google_cloud_run_service.create_cloud_run.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_cloud_run_domain_mapping" "api_domain" {
  location = var.gcp_region
  name     = var.domain_service

  metadata {
    namespace = var.gcp_project_id
    labels = {
      project     = var.service_name
      environment = var.NODE_ENV
    }
  }

  spec {
    route_name = google_cloud_run_service.create_cloud_run.name
  }
}
