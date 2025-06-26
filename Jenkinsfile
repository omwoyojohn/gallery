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

        stage("Install Dependencies") {
            steps {
                echo "Installing dependencies"
                sh "npm install"
            }
        }

        stage("Build Project") {
            steps {
                echo "Building the Node.js project..."
                // If you have a build step like 'npm run build', add it here
                // sh "npm run build"
            }
        }

        stage("Run Tests") {
            steps {
                echo "Running tests"
                sh "npm test"
            }
        }

        stage("Deploy to Render") {
            steps {
                echo "Deploying to Render..."
                withCredentials([string(credentialsId:'render-deploy-hook', variable:'DEPLOY_HOOK')]) {
                    sh "curl -X POST $DEPLOY_HOOK"
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
        }

        always {
            echo 'Pipeline execution completed'
        }
    }
}
