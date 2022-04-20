# DocumentAssesor

** Description**
_the User View of the project titled Document Assessor. which is used by Researchers to create new Assessment Tasks that are assessed by the Users assigned by the system. Users sign into their on-line account and sign up with assessment tasks by viewing its details. The assessments are done by inputting responses to various questions asked in an Assessment Form related to the documents being assessed._

## Requirements

For development, you will only need Node.js, Mongodb and a node global package, npm, installed in your environement.
** Steps to Run the code from the git repository:**
** https://github.com/tonysajan/DocumentAssessor **

1. Clone the repository by using:

   git clone 'https://github.com/tonysajan/DocumentAssessor' DocumentAssessor

2. Download mongodb and connect to the cloud database via link given in .env file.
3. Run the 'npm install' command to download all dependencies
4. Build and run the project 'npm run dev'
5. Navigate to http://localhost:9999
   ** You can change the port of the local host in the .env file**

## Project Structure

** This project requires the following modules: **

    /client             -   Client side scripts to consume the restful APIs

    /controller         -   Controllers define functions to serve various express routes

    /model              -   Models define schemas that will be used in storing and retrieving data from database

    /routes             -   Contain all express routes, separated by module/area of application

    /views              -   Contains static html files

    /server.js          -   Entry point to express app

    /.env               -   Environment specific configuration

    /package.json       -   Contains npm dependencies as well as build scripts

## Libraries used

    #bcryptjs
    #cookie-parser
    #dotenv
    #email-validator
    #express
    #html
    #jsonwebtoken
    #mongoose
    #nodemon
    #passport
    #password-validator
