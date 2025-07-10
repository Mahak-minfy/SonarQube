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

   stage('Run Tests & Generate Coverage') {
    steps {
        sh 'chmod +x ./node_modules/.bin/jest && ./node_modules/.bin/jest --coverage'
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
