provider "nomad" {
  address = "https://nregner.net"
}

# Register a job
resource "nomad_job" "monitoring" {
  jobspec = file("${path.module}/jobspec.hcl")
}