// createTables.js
const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB({
  region: "local",
  endpoint: "http://localhost:8000",
  accessKeyId: "fakeMyKeyId",
  secretAccessKey: "fakeSecretKey",
});

async function createTables() {
  try {
    // UsersTable
    const usersTableParams = {
      TableName: "UsersTable",
      AttributeDefinitions: [
        { AttributeName: "email", AttributeType: "S" },
      ],
      KeySchema: [
        { AttributeName: "email", KeyType: "HASH" },
      ],
      BillingMode: "PAY_PER_REQUEST",
    };

    // NotesTable
    const notesTableParams = {
      TableName: "NotesTable",
      AttributeDefinitions: [
        { AttributeName: "userId", AttributeType: "S" },
        { AttributeName: "id", AttributeType: "S" },
      ],
      KeySchema: [
        { AttributeName: "userId", KeyType: "HASH" },
        { AttributeName: "id", KeyType: "RANGE" },
      ],
      BillingMode: "PAY_PER_REQUEST",
    };

    const existingTables = await dynamoDB.listTables().promise();

    if (!existingTables.TableNames.includes("UsersTable")) {
      await dynamoDB.createTable(usersTableParams).promise();
      console.log("✅ UsersTable created");
    } else {
      console.log("ℹ️ UsersTable already exists");
    }

    if (!existingTables.TableNames.includes("NotesTable")) {
      await dynamoDB.createTable(notesTableParams).promise();
      console.log("✅ NotesTable created");
    } else {
      console.log("ℹ️ NotesTable already exists");
    }

    console.log("All tables are ready!");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
}

createTables();
