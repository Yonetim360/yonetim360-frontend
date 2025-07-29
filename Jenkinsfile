pipeline {
    agent any
    
    // SCM otomatik olarak credential ile checkout yapacak
    options {
        skipDefaultCheckout(false)
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                // Docker build işlemleri
                script {
                    // Örnek Docker build
                    sh 'docker build -t yonetim360-frontend .'
                }
            }
        }
        
        stage('Stop Existing Container') {
            steps {
                script {
                    sh '''
                        docker stop yonetim360-frontend-container || true
                        docker rm yonetim360-frontend-container || true
                    '''
                }
            }
        }
        
        stage('Run New Container') {
            steps {
                script {
                    sh '''
                        docker run -d --name yonetim360-frontend-container \
                        -p 3000:3000 yonetim360-frontend
                    '''
                }
            }
        }
    }
}