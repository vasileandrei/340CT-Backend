FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN ls -la

# Install global dependencies
RUN echo "Installing global dependencies" && \
    npm update && \
    npm install -g jest && \
    npm install -g codecov && \
    npm install -g mocha && \
    npm install -g npm-dview

# Install gateway api specific dependencies
RUN echo "Installing package json dependencies" && \
    cd EmailApi && npm install && cd - &&\
    cd FilesApi && npm install && cd - &&\
    cd GatewayApi && npm install && cd - &&\
    cd UsersApi && npm install && cd -

# Expose port
EXPOSE 8084

# Run makefile
CMD [ "make docker" ]