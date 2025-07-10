pipeline {
    agent any

    tools {
        nodejs 'NodeJS_18'                     // Ensure this NodeJS version is configured in Jenkins
    }

    environment {
        SONARQUBE_SCANNER = 'MySonarQube' // This is the name from Global Tool Config
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm                    // Clones from GitHub as configured in Jenkins
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'                // Installs project dependencies
            }
        }

        stage('Run Tests & Generate Coverage') {
            steps {
                sh 'npm test -- --coverage'     // Runs tests and generates coverage report (optional for Sonar)
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('My SonarQube') {   // Matches the SonarQube server name from Jenkins config
                    sh "${tool 'SonarQubeScanner'}/bin/sonar-scanner"   // Runs the scanner
                }
            }
        }

        stage("Quality Gate") {
            steps {
                timeout(time: 2, unit: 'MINUTES') {  // Increased timeout slightly
                    waitForQualityGate abortPipeline: true  // Stops pipeline if Quality Gate fails
                }
            }
        }
    }
}
