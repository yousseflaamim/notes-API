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

2️⃣ Install required dependencies

npm install joi
npm install uuid jsonwebtoken bcryptjs middy @middy/jwt
npm install aws-sdk

3️⃣ Install development dependencies

npm install --save-dev serverless@3
npm install serverless-offline serverless-dynamodb-local -D

3️⃣ Install development dependencies

npm install --save-dev serverless@3
npm install serverless-offline serverless-dynamodb-local -D

AWS Local Configuration

You can configure fake AWS credentials manually or via terminal.

Option 1 — Create config files manually

📁 C:\Users\user.aws\config
