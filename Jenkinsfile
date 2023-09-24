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
                sh 'npm start'
            }
        }
        stage('executar testes'){
            steps{
                sh 'npm run cy:run'
            }
        }
    }
}