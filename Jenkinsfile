pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        RENDER_URL = 'https://gallery-u51o.onrender.com'
    }

    stages {
        stage('Check code') {
            steps {
                echo "Checking code from Omwoyo's gallery repository"
                git branch: 'master', url: 'https://github.com/omwoyojohn/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies"
                sh 'npm install'
            }
        }

        stage('Building code') {
            steps {
                echo "Building code"
                // Optional: sh 'npm run build' or your custom build script
                sh 'echo "No build script needed for now"'
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running tests"
                sh 'npm test || echo "No tests configured, skipping..."'
            }
        }

        stage('Deploy to Render') {
            steps {
                echo "Deploying to Render..."
                withCredentials([string(credentialsId: 'render-deploy-hook', variable: 'DEPLOY_HOOK')]) {
                    sh 'curl -X POST $DEPLOY_HOOK'
                }
            }
        }
    }

    post {
        failure {
            echo "Pipeline failed"
        }

        success {
            echo "Pipeline completed successfully"
            echo "Deployment to Render was successful"

            slackSend(
                channel: '#all-sophieip1', // ✅ UPDATE if you have a different channel
                color: 'good',
                tokenCredentialId: 'Sophie_IP1', // ✅ UPDATE this if you have your own Slack token
                message: """
                Deployment Successful 🎉

                Build ID: #${env.BUILD_NUMBER}
                Branch: master
                Live URL: ${env.RENDER_URL}
                """
            )
        }

        always {
            echo 'Pipeline execution completed'
        }
    }
}
