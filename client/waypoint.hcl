project = "bonde"

app "redes-client" {
  labels = {
      "service" = "bonde-redes-client",
      "env" = "dev"
  }

  build {
    use "docker" {}
    registry {
      use "docker" {
        image = "nossas/bonde-redes-client"
        tag   = "latest"
      }
    }
 }

  deploy {
    use "kubernetes" {
    probe_path = "/"
    }
  }

  release {
    use "kubernetes" {
      port = 3000
    }
  }
}

