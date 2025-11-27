//handler/restorenote.js

const { docClient } = require("./db");
const NOTES_TABLE = process.env.NOTES_TABLE;

module.exports.restoreNote = async (event) => {
  try {
    const { id } = JSON.parse(event.body);
    const userEmail = event.headers["x-user-email"];
    if (!userEmail) return { statusCode: 401, body: "Unauthorized" };

    const params = {
      TableName: NOTES_TABLE,
      Key: { userId: userEmail, id },
      UpdateExpression: "set deleted=:d, modifiedAt=:m",
      ExpressionAttributeValues: {
        ":d": false,
        ":m": new Date().toISOString()
      },
      ReturnValues: "ALL_NEW"
    };

    const restored = await docClient.update(params).promise();
    return { statusCode: 200, body: JSON.stringify(restored.Attributes) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Internal server error" };
  }
};

