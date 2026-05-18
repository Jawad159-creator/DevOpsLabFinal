pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-login-id' // ID set up in Jenkins credentials
        DOCKER_USER           = 'jawadawan'
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t ${DOCKER_USER}/react-frontend:latest ./frontend"
                sh "docker build -t ${DOCKER_USER}/node-backend:latest ./backend"
            }
        }

        stage('Login & Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo ${PASS} | docker login -u ${USER} --password-stdin"
                    sh "docker push ${DOCKER_USER}/react-frontend:latest"
                    sh "docker push ${DOCKER_USER}/node-backend:latest"
                }
            }
        }

        stage('Deploy to Kubernetes Cluster') {
            steps {
                // Tells Kubernetes to pull down the newly pushed images and run the pods
                sh "kubectl apply -f k8s/app-deployment.yml"
            }
        }
    }
}