job "docs" {
  datacenters = ["dc1"]
  type        = "batch"

  periodic {
    # cron             = "*/15 * * * * *"
    cron             = "* * * * * *"
    prohibit_overlap = true
  }

  group "backup" {
    task "example" {
      driver = "exec"
      config {
        command = "bash -c \"echo 'Test'\""
      }
    }
  }
}