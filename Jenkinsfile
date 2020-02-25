#!groovy

String PROJECT = "fixxx-looplijsten-frontend"

def tryStep(String message, Closure block, Closure tearDown = null) {
    try {
        block();
    }
    catch (Throwable t) {
        slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel', color: 'danger'

        throw t;
    }
    finally {
        if (tearDown) {
            tearDown();
        }
    }
}

node {
    stage("Checkout") {
        checkout scm
    }

    stage("Lint") {
        tryStep "lint start", {
            sh "docker-compose -p ${PROJECT} up --exit-code-from lint"
        }
        always {
            tryStep "lint stop", {
                sh "docker-compose -p ${PROJECT} down --rmi local -v || true"
            }
        }
    }


    stage("Test") {
        tryStep "test start", {
            sh "docker-compose -p ${PROJECT} up --exit-code-from test"
        }
        always {
            tryStep "test stop", {
                sh "docker-compose -p ${PROJECT} down --rmi local -v || true"
            }
        }
    }

    stage("Build develop image") {
        tryStep "build", {
            def image = docker.build("repo.secure.amsterdam.nl/fixxx/looplijsten-frontend:${env.BUILD_NUMBER}", ".")
            image.push()
        }
    }
}

String BRANCH = "${env.BRANCH_NAME}"

if (BRANCH == "master") {
    node {
        stage('Push acceptance image') {
            tryStep "image tagging", {
                def image = docker.image("repo.secure.amsterdam.nl/fixxx/looplijsten-frontend:${env.BUILD_NUMBER}")
                image.pull()
                image.push("acceptance")
            }
        }
    }

    node {
        stage("Deploy to ACC") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                        parameters: [
                                [$class: 'StringParameterValue', name: 'INFRASTRUCTURE', value: 'secure'],
                                [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                                [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-looplijsten-frontend.yml'],
                        ]
            }
        }
    }

    stage('Waiting for approval') {
        slackSend channel: '#ci-channel', color: 'warning', message: 'Looplijsten frontend is waiting for Production Release - please confirm'
        input "Deploy to Production?"
    }

    node {
        stage('Push production image') {
            tryStep "image tagging", {
                def image = docker.image("repo.secure.amsterdam.nl/fixxx/looplijsten-frontend:${env.BUILD_NUMBER}")
                image.pull()
                image.push("production")
                image.push("latest")
            }
        }
    }

    node {
        stage("Deploy") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                        parameters: [
                                [$class: 'StringParameterValue', name: 'INFRASTRUCTURE', value: 'secure'],
                                [$class: 'StringParameterValue', name: 'INVENTORY', value: 'production'],
                                [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-looplijsten-frontend.yml'],
                        ]
            }
        }
    }
}
