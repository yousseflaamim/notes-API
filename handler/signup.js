// handler/signup.js
const { docClient } = require("./db");
const bcrypt = require("bcryptjs");

const USERS_TABLE = process.env.USERS_TABLE;

module.exports.signup = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return { statusCode: 400, body: JSON.stringify({ message: "Email and password required" }) };
    }

    const existing = await docClient.get({ TableName: USERS_TABLE, Key: { email } }).promise();
    if (existing.Item) {
      return { statusCode: 400, body: JSON.stringify({ message: "User already exists" }) };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await docClient.put({ TableName: USERS_TABLE, Item: { email, password: hashedPassword } }).promise();

    return { statusCode: 200, body: JSON.stringify({ message: "User created" }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ message: "Internal server error" }) };
  }
};
