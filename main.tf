terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
     
    }
  }
}



provider "docker" {}


resource "docker_network" "mern_stack_network" {
  name = "mern-stack-network"
}

resource "docker_volume" "mongo_data" {
  name = "mongoData"
}

resource "docker_volume" "mosquitto_data" {
  name = "mosquitto-data-vol"
}

resource "docker_volume" "mosquitto_log" {
  name = "mosquitto-log-vol"
}

resource "docker_volume" "influxdb2_data" {
  name = "influxdb2-vol"
}

resource "docker_volume" "influxdb2_config" {
  name = "influxdb2-config-vol"
}

resource "docker_container" "vue_container" {
  name  = "vue.container"
  image = data.docker_image.front.image_name

  build {
    context    = "./client"
    dockerfile = "Dockerfile"
  }

  ports {
    internal = 80
    external = 5175
  }

  volumes {
    host_path      = "./client"
    container_path = "/app"
  }

  depends_on = [docker_container.express_container.id]
  network    = docker_network.mern_stack_network.name
}

resource "docker_container" "express_container" {
  name  = "express-container"
  image = data.docker_image.backend.image_name

  build {
    context    = "./server"
    dockerfile = "Dockerfile"
  }

  ports {
    internal = 5000
    external = 5000
  }

  volumes {
    host_path      = "./server"
    container_path = "/app"
  }

  depends_on = [docker_container.mongo_container.id, docker_container.mosquitto_container.id, docker_container.influxdb2_container.id]
  network    = docker_network.mern_stack_network.name
}

resource "docker_container" "mongo_container" {
  name   = "mongo-container"
  image  = "mongo"

  ports {
    internal = 27017
    external = 27017
  }

  volumes {
    container_path = "/data/db"
  }

}

resource "docker_container" "mosquitto_container" {
  name  = "mosquitto-container"
  image = "eclipse-mosquitto:2.0.15"
 
  }
  
  

  
