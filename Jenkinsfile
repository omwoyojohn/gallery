pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'git@github.com:omwoyojohn/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
                    emailext(
                        subject: "Jenkins Build #${env.BUILD_NUMBER} Failed",
                        body: "Tests failed. Check Jenkins logs.",
                        to: 'omwoyojohn91@gmail.com'
                    )
                    error('Tests failed')
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                sh "curl -X POST https://api.render.com/deploy/srv-d1cit115pdvs73etlbo0?key=MhGvOei8u9Y"
            }
            post {
                success {
                    slackSend(
                        channel: '#omwoyo-ip1',
                        color: 'good',
                        message: "✅ Milestone 3 Deployed! Build #${env.BUILD_NUMBER}: https://gallery-u51o.onrender.com",
                        teamDomain: 'your-team-domain',
                        tokenCredentialId: 'slacktoken',
                        botUser: true
                    )
                    slackSend(
                        channel: '#all-ip-1-assignment',
                        color: 'good',
                        message: "✅ Milestone 3 for Omwoyo deployed: https://gallery-u51o.onrender.com",
                        teamDomain: 'your-team-domain',
                        tokenCredentialId: 'slacktoken',
                        botUser: true
                    )
                }
            }
        }
    }

    post {
        success {
            echo 'Build and deploy successful.'
        }
        always {
            echo 'Pipeline complete.'
        }
    }
}
