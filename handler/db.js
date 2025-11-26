// handler/db.js
const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({
  region: "local",
  endpoint: "http://localhost:8000", // Docker DynamoDB
  accessKeyId: "fakeMyKeyId",
  secretAccessKey: "fakeSecretKey",
});

module.exports = { docClient };
