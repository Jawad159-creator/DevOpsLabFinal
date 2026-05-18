variable "aws_access_key" {}
variable "aws_secret_key" {}

provider "aws" {
  region     = "us-east-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

# 1. Define the Security Group (Firewall)
resource "aws_security_group" "devops_sg" {
  name        = "devops_lab_sg"
  description = "Allow inbound traffic for SSH, Frontend, Backend, and Jenkins services"

  ingress {
    description = "SSH Access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "React Frontend HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Node.js Backend API"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Port 8080 for Jenkins Web UI Dashboard Access
  ingress {
    description = "Jenkins UI"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "devops-lab-sg"
  }
}

# 2. Define the EC2 Instance with 20GB Storage
resource "aws_instance" "devops_server" {
  ami                    = "ami-04b70fa74e45c3917" 
  instance_type          = "c7i-flex.large"             
  key_name               = "devops-key"            
  vpc_security_group_ids = [aws_security_group.devops_sg.id] 

  root_block_device {
    volume_size           = 20      
    volume_type           = "gp3"   
    delete_on_termination = true    
  }

  tags = {
    Name = "DevOps-Core-Server"
  }
}

output "instance_ip" {
  value = aws_instance.devops_server.public_ip
}