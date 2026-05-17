provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "devops_server" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS Intel AMI (Check your region's AMI)
  instance_type = "t2.medium"             # t2.medium is highly recommended for running K8s/Jenkins

  tags = {
    Name = "DevOps-Core-Server"
  }
}

output "instance_ip" {
  value = aws_instance.devops_server.public_ip
}
