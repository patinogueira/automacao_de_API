pipeline {
    agent any
    
    tools {
        nodejs '20.7.0'
    }    

    stages {
        stage('Clonar o repositorio git') {
            steps {
                git branch: 'main', url: 'https://github.com/patinogueira/automacao_de_API'
            }
        }
        stage('Instalar dependencias'){
            steps{
                sh 'npm install'
            }
        }
        stage('iniciar servidor'){
            steps{
                sh 'npx serverest &'
            }
        }
        stage('executar testes'){
            steps{
                sh 'NO_COLOR=1 npm run cy:run'
            }
        }
        stage('gerar relatorio'){
            steps{
                sh 'npm run cy:report'
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'mochawesome-report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true])
            }
        }        

    }
}