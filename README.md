# Notes API (Serverless + DynamoDB Local)

This project is a **Notes API** built using:
- **Node.js**
- **AWS Lambda**
- **Serverless Framework**
- **DynamoDB Local**
- **Offline development environment**

The API includes:
- User registration & login
- Notes CRUD operations
- JWT authentication
- DynamoDB local database

---

## 📌 Requirements

Before starting, make sure you have installed:

- Node.js (v16+)
- NPM
- Docker
- AWS CLI
- Serverless Framework

---

## 📁 Project Setup

### 1️⃣ Initialize the project
```bash
npm init -y

## 2️⃣ Install required dependencies

npm install joi
npm install uuid jsonwebtoken bcryptjs middy @middy/jwt
npm install aws-sdk

## 3️⃣ Install development dependencies

npm install --save-dev serverless@3
npm install serverless-offline serverless-dynamodb-local -D

## 3️⃣ Install development dependencies

npm install --save-dev serverless@3
npm install serverless-offline serverless-dynamodb-local -D

### AWS Local Configuration

You can configure fake AWS credentials manually or via terminal.

## Option 1 — Create config files manually

📁 C:\Users\user.aws\config
[default]
region = us-east-1
output = json

📁 C:\Users\user.aws\credentials

[default]
aws_access_key_id = fake
aws_secret_access_key = fake2

## Option 2 — Configure using AWS CLI

aws configure

# Enter anything:

AWS Access Key ID: fakeMyKeyId
AWS Secret Access Key: fakeSecretKey
Default region name: us-east-1
Default output format: json

## Option 3 — Set environment variables
set AWS_ACCESS_KEY_ID=fakeMyKeyId
set AWS_SECRET_ACCESS_KEY=fakeSecretKey
set AWS_DEFAULT_REGION=us-east-1

##  Run DynamoDB Local using Docker

docker run -p 8000:8000 -v C:\Users\username\dynamodb-data:/home/dynamodblocal/data amazon/dynamodb-local -jar DynamoDBLocal.jar -dbPath /home/dynamodblocal/data -sharedDb

## Create DynamoDB Tables
createTables.js
## Run
node createTables.js

## Scan tables (check data)
aws dynamodb scan --table-name UsersTable --endpoint-url http://localhost:8000
aws dynamodb scan --table-name NotesTable --endpoint-url http://localhost:8000

## Start Serverless Offline

npx serverless offline start

## Project Structure
notes-api/
│
├── handler/
│   ├── signup.js          
│   ├── login.js           
│   ├── getNotes.js        
│   ├── createNote.js      
│   ├── updateNote.js      
│   ├── deleteNote.js      
│   ├── restoreNote.js    
│   ├── validator.js       
│   └── db.js              
│
├── createTables.js        
├── serverless.yml        
├── package.json           
└── README.md             




