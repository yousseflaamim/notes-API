//handler/updetnotes.js

const { docClient } = require("./db");
const NOTES_TABLE = process.env.NOTES_TABLE;

module.exports.updateNote = async (event) => {
  try {
    const { id, title, text } = JSON.parse(event.body);
    const userEmail = event.headers["x-user-email"];
    if (!userEmail) return { statusCode: 401, body: "Unauthorized" };

    const params = {
      TableName: NOTES_TABLE,
      Key: { userId: userEmail, id },
      UpdateExpression: "set #t=:t, #x=:x, modifiedAt=:m",
      ExpressionAttributeNames: {
        "#t": "title",
        "#x": "text" 
      },
      ExpressionAttributeValues: {
        ":t": title,
        ":x": text,
        ":m": new Date().toISOString()
      },
      ReturnValues: "ALL_NEW"
    };

    const updated = await docClient.update(params).promise();
    return { statusCode: 200, body: JSON.stringify(updated.Attributes) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Internal server error" };
  }
};
