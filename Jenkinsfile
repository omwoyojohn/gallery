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
                withCredentials([string(credentialsId: 'SLACK_WEBHOOK', variable: 'SLACK_URL')]) {
                    script {
                        try {
                            sh 'npm test'
                        } catch (err) {
                            sh """
                            curl -X POST -H 'Content-type: application/json' \
                            --data '{"text":"🚨 *Test Stage Failed* for job *${env.JOB_NAME}* <${env.BUILD_URL}|#${env.BUILD_NUMBER}>. Please investigate."}' \
                            $SLACK_URL
                            """
                            error("Tests failed. Stopping the build.")
                        }
                    }
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                sh 'curl -X POST https://api.render.com/deploy/srv-d1cit115pdvs73etlbo0?key=MhGvOei8u9Y'
            }
        }
    }

    post {
        success {
            withCredentials([string(credentialsId: 'SLACK_WEBHOOK', variable: 'SLACK_URL')]) {
                sh """
                curl -X POST -H 'Content-type: application/json' \
                --data '{"text":"✅ *Build Success* for job *${env.JOB_NAME}* <${env.BUILD_URL}|#${env.BUILD_NUMBER}>. Deployed to Render."}' \
                $SLACK_URL
                """
            }
        }
        failure {
            withCredentials([string(credentialsId: 'SLACK_WEBHOOK', variable: 'SLACK_URL')]) {
                sh """
                curl -X POST -H 'Content-type: application/json' \
                --data '{"text":"❌ *Build Failed* for job *${env.JOB_NAME}* <${env.BUILD_URL}|#${env.BUILD_NUMBER}>. Check the console output."}' \
                $SLACK_URL
                """
            }
        }
    }
}
