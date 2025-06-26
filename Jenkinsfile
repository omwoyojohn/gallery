pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    try {
                        sh 'npm test'
                    } catch (err) {
                        mail to: 'jonwonga@livinggoods.org',
                             subject: "🚨 Jenkins Build Failed: Tests Did Not Pass",
                             body: "Hey Omwoyo, the tests failed in the pipeline. Please check and fix the issues."
                        error("Tests failed. Stopping the build.")
                    }
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                // Replace this with your actual deploy command
                sh './deploy.sh'  // or your curl/webhook to Render
            }
        }
    }
}
