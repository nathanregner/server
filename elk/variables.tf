variable "namespace" {
  type    = string
  default = "logging"
}

variable "storage" {
  type    = string
  default = "10Gi"
}

variable "java_opts" {
  type    = string
  default = "-Xms512M -Xmx2G"
}
