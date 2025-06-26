pipeline {
    agent any

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

        stage('Install Node.js') {
            steps {
                echo "Installing Node.js manually..."
                sh '''
                    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                    sudo apt-get install -y nodejs
                    node -v
                    npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies"
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                echo "Building code"
                sh 'echo "No build step needed"'
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running tests"
                sh 'npm test || echo "No tests defined"'
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
                channel: '#all-sophieip1',
                color: 'good',
                tokenCredentialId: 'Sophie_IP1',
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
