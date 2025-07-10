pipeline {
    agent any

    tools {
        nodejs 'NodeJS_18'   // NodeJS tool name configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm   // Pulls code from GitHub
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'   // Installs dependencies from package.json
            }
        }

      stage('Fix Jest Permissions') {
            steps {
                sh 'chmod +x ./node_modules/.bin/jest'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx jest --ci --reporters=default --reporters=jest-junit'
            }
        }


        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('My SonarQube') {   // SonarQube server name from Jenkins
                    sh "${tool 'SonarQubeScanner'}/bin/sonar-scanner"
                }
            }
        }

        stage("Quality Gate") {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true   // Stop if quality gate fails
                }
            }
        }
    }
}
