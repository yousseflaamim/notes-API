// handler/createNote.js
const { docClient } = require("./db");
const { v4: uuidv4 } = require("uuid");
const { validateNoteInput } = require("./validator");
const NOTES_TABLE = process.env.NOTES_TABLE;

module.exports.createNote = async (event) => {
  try {
    const { title, text } = JSON.parse(event.body);

   
    const validationError = validateNoteInput({ title, text });
    if (validationError) return { statusCode: 400, body: validationError };

    const userEmail = event.headers["x-user-email"];
    if (!userEmail) return { statusCode: 401, body: "Unauthorized" };

    const now = new Date().toISOString();
    const note = { 
      id: uuidv4(), 
      userId: userEmail, 
      title, 
      text, 
      deleted: false, 
      createdAt: now, 
      modifiedAt: now 
    };

    await docClient.put({ TableName: NOTES_TABLE, Item: note }).promise();
    return { statusCode: 200, body: JSON.stringify(note) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Internal server error" };
  }
};
