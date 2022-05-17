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
                    dir("TravelBlog-FrontEnd") {
                        sh "npm install"
                        sh "npm i @vue/cli-service"
                        sh "npm run build "

                    }
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
     }
}