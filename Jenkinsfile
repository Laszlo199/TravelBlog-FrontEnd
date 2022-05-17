pipeline{
    agent any
    triggers {
        pollSCM("* * * * *")
    }
    tools {
        nodejs "18.1.0"
    }
    stages{
        stage("build"){
            steps{
                echo ("Building frontend started")
                dir("TravelBlog-FrontEnd") {
                    sh "npm run build "
                }
            }
            post {
                always {
                    sh "echo 'Building frontend finished'"
                }
                success {
                    sh "echo 'Building frontend succeeded'"
                }
                failure {
                    sh "echo 'Building frontend failed'"
                }
            }
        }

        stage("Clean container") {
            steps {
                script {
                    try {
                        sh "docker-compose down"
                    } finally{ }
                }
            }
        }

        stage("Deploy") {
            steps {
                sh "docker-compose up -d"
            }
            post {
                always {
                    sh "echo 'deploying frontend finished'"
                }
                success {
                    sh "echo 'deploying frontend succeeded'"
                }
                failure {
                    sh "echo 'deploying frontend failed'"
                }
            }
        }
    }
}