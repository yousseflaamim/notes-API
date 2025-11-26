//handler/deletenotes.js
const { docClient } = require("./db");
const NOTES_TABLE = process.env.NOTES_TABLE;

module.exports.deleteNote = async (event) => {
  try {
    const { id } = JSON.parse(event.body);
    const userEmail = event.headers["x-user-email"];
    if (!userEmail) return { statusCode: 401, body: "Unauthorized" };

    const params = {
      TableName: NOTES_TABLE,
      Key: { userId: userEmail, id },
      UpdateExpression: "set deleted=:d, modifiedAt=:m",
      ExpressionAttributeValues: {
        ":d": true,
        ":m": new Date().toISOString()
      },
      ReturnValues: "ALL_NEW"
    };

    const deletedNote = await docClient.update(params).promise();
    return { statusCode: 200, body: JSON.stringify(deletedNote.Attributes) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Internal server error" };
  }
};

