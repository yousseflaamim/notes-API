
//handler/getnotes.js
const { docClient } = require("./db");
const NOTES_TABLE = process.env.NOTES_TABLE;

module.exports.getNotes = async (event) => {
  try {
    const userEmail = event.headers["x-user-email"];
    if (!userEmail) return { statusCode: 401, body: "Unauthorized" };

    const params = {
      TableName: NOTES_TABLE,
      KeyConditionExpression: "userId = :userId",
      FilterExpression: "deleted = :d",
      ExpressionAttributeValues: {
        ":userId": userEmail,
        ":d": false // ← فقط الملاحظات غير المحذوفة
      }
    };

    const result = await docClient.query(params).promise();
    return { statusCode: 200, body: JSON.stringify(result.Items) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Internal server error" };
  }
};
