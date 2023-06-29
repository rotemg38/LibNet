# LibNet
This is a library management project written in nodejs for server-side and reactjs for client-side with recommendation algorithm.

## Project Structure
1) server folder - contains the code for the server side and the python code of the recommendation algorithm
2) client folder  -  contains the code for the client side
3) db folder - contains files of data for the database and code to proccess the data and generate more fake data in order to fill the DB
4) tests folder - contains tests for the API in the server folder

## Description
Main pages logged as admin:
 


https://github.com/rotemg38/LibNet/assets/100946838/adb404e2-4021-48c5-9d3b-b82d5f5031f6


## Technologies
- ReactJs
- NodeJs
- MongoDB
- Bootstrap
- Jest Tests
- Surprise Library
- HTML
- CSS
- JS
- Python


## Getting Started
Considering you have mongodb database.

Create in folder server .env file contain the following variables:
```
MONGO_USER = "<FILL>"
MONGO_PASS = "<FILL>"
MONGO_HOST = "<FILL>"
MONGO_DB = "<FILL>"
```

**NOTE:** The project use the connection string of Mongodb Atlas.


### Installing & Executing program
First, make sure that npm and nodejs is installed on your computer.

Download the project and via your prefered IDE run the application.

I recommend on VSCode as an excellent IDE therefore I will explain how to run the project on this IDE.

Now you need to run the server side and then the client side.

### Run Server

After opening the project in VSCode, open VSCode Terminal tab. 

run the command to enter the folder:
```
cd server
```
And make sure to **delete package-lock.json file.**

Then run the following commands:

1)
```
npm install
```
(This command install all dependencies according to the package.json file in the project)

2)
```
npm start
```
(To run the server)


### Run Client

Now open new tab to run the client side.

run the command to enter the folder:
```
cd client
```
And make sure to **delete package-lock.json file.**

Then run the following commands:

1)
```
npm install
```
(This command install all dependencies according to the package.json file in the project)

2)
```
npm start
```
(To run the client)



## Authors

Contributors names:

- Rotem Ghidale

