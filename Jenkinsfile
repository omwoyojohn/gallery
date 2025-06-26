pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Pulling the latest code from the repository...'
                git branch: 'master', url: 'https://github.com/omwoyojohn/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing required Node.js packages...'
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                echo 'Building the Node.js project...'
            }
        }

        stage('Deploy to Render') {
            steps {
                echo 'Sending deploy request to Render...'
                withCredentials([string(credentialsId: 'render-deploy-hook', variable: 'DEPLOY_HOOK')]) {
                    sh 'curl -X POST $DEPLOY_HOOK'
                }
            }
        }
    }
}
