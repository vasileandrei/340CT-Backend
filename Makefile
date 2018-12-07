
#################################
#      DOCKER TARGET            #
#################################

.PHONY: docker
docker: dependencies unitTesting integrationTesting codeCoverage deploy-local



######################
#    TRAVIS ROUTE    #
######################

# Master Branch
ifneq (,$(findstring master, $(TRAVIS_BRANCH)))
$(info This is a Master Build)
.PHONY: all
all: dependencies unitTesting integrationTesting codeCoverage deploy-local deploy-docker check-docker-deployment

# Develop Branch
else ifneq (,$(findstring develop, $(TRAVIS_BRANCH)))
$(info This is a Develop Build)
.PHONY: all
all: dependencies unitTesting integrationTesting codeCoverage deploy-local

# Pull Request
else ifneq ($(TRAVIS_PULL_REQUEST_BRANCH),)
$(info This is a Pull Request Build)
.PHONY: all
all: dependencies unitTesting integrationTesting codeCoverage

# Regular Branch
else
$(info This is a push build, branch: $(TRAVIS_BRANCH))
.PHONY: all
all: dependencies unitTesting codeCoverage
endif



######################
#    BASIC TESTS     #
######################

.PHONY: dependencies
dependencies:
	bash scripts/installDependencies.sh -n ${SERVER_FILE}
	bash scripts/startTests.sh -n ${SERVER_FILE} -t dependencies

.PHONY: unitTesting
unitTesting:
	bash scripts/startTests.sh -n ${SERVER_FILE} -t unit

.PHONY: codeCoverage
codeCoverage:
	bash scripts/startTests.sh -n ${SERVER_FILE} -t coverage

.PHONY: integrationTesting
integrationTesting:
	bash scripts/startTests.sh -n ${SERVER_FILE} -t integration



######################
#    DEPLOY          #
######################

.PHONY: deploy-local
deploy-local:
	bash scripts/deployServer.sh -n ${SERVER_FILE} -m travis

.PHONY: deploy-docker
deploy-docker:
	echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
	docker build -t ${DOCKER_USERNAME}/${APP_NAME} .
	docker run -p ${DOCKER_HOST}:${DOCKER_PORT} -d ${DOCKER_USERNAME}/${APP_NAME}


#################################
#    Basic Deploy Test          #
#################################

.PHONY: check-docker-deploy
check-docker-deploy:
	docker ps
	echo "Checking deploy status" && curl -i localhost:${DOCKER_PORT}