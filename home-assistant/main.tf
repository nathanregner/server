terraform {
  backend "gcs" {
    bucket = "terraform-9cb16bb5-c138-4def-9921-cb74788cf18c"
    prefix = "home-assistant"
  }
}

provider "google" {
  # gcloud auth application-default login
  project = "home-assistant-344504"
  region  = "us-west4"
}

resource "google_project_service" "smartdevicemanagement" {
  service            = "smartdevicemanagement.googleapis.com"
  disable_on_destroy = true
}

resource "google_project_service" "pubsub" {
  service            = "pubsub.googleapis.com"
  disable_on_destroy = true
}

resource "random_pet" "service_account" {}

resource "google_service_account" "service_account" {
  account_id   = random_pet.service_account.id
  display_name = "Home Assistant Nest Integration"
}

resource "google_project_service" "smartdevicemanagement" {
  service            = "smartdevicemanagement.googleapis.com"
  disable_on_destroy = true
}
