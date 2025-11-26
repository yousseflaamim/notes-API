//handler/logib.js
const { docClient } = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const USERS_TABLE = "UsersTable"; 
const JWT_SECRET = "supersecret_local"; 

module.exports.login = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return { statusCode: 400, body: JSON.stringify({ message: "Email and password required" }) };
    }

    const user = await docClient.get({ TableName: USERS_TABLE, Key: { email } }).promise();
    if (!user.Item) {
      return { statusCode: 401, body: JSON.stringify({ message: "Invalid credentials" }) };
    }

    const valid = await bcrypt.compare(password, user.Item.password);
    if (!valid) {
      return { statusCode: 401, body: JSON.stringify({ message: "Invalid credentials" }) };
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

    return { statusCode: 200, body: JSON.stringify({ token }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ message: "Internal server error" }) };
  }
};
