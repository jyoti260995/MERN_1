require("dotenv").config();

const connectDB = require("../config/db");
const JournalEntry = require("../models/JournalEntry");

async function migrateModels() {
  try {
    await connectDB();

    console.log("🚀 Starting Model Migration...");

    const cursor = JournalEntry.find({
      modelVersion: "v1",
    }).cursor();

    let count = 0;

    for (
      let entry = await cursor.next();
      entry != null;
      entry = await cursor.next()
    ) {
      await JournalEntry.updateOne(
        { _id: entry._id },
        {
          $set: {
            modelVersion: "v2",
            status: "PENDING",
          },
        }
      );

      count++;

      console.log(`Updated ${entry.entryNo}`);
    }

    console.log(`✅ Migration Complete (${count} records)`);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrateModels();