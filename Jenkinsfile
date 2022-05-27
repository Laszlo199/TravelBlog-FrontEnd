pipeline{
    agent any

     triggers {
        pollSCM("* * * * *")
      }

 tools {
        nodejs "18.1.0"
    }
     stages{
           stage("Build"){
                steps {

                    sh "npm install -g @vue/cli"
                    sh "npm install"
                    sh "npm i @vue/cli-service"
                    sh "npm run build "
                     sh "docker-compose --env-file config/Test.env build web"
                }
                post{
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
                steps{
                    script{
                        try{
                            sh "docker-compose --env-file config/Test.env down"
                        }finally{ }
                    }

                }
              }

             stage("Deploy to testing") {
                       steps{
                           sh "docker-compose --env-file config/Test.env up -d"
                       }
                        post{
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
             stage("Deploy to production") {
                         steps {
                             sh "docker-compose --env-file config/Prod.env up -d"
                         }
                     }
     }
}