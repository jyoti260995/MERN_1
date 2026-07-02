require("dotenv").config();

const connectDB = require("../config/db");
const JournalEntry = require("../models/JournalEntry");

async function updateRiskScores() {
  try {
    await connectDB();

    console.log("🚀 Updating Risk Scores...");

    const cursor = JournalEntry.find().cursor();

    let count = 0;

    for (
      let entry = await cursor.next();
      entry != null;
      entry = await cursor.next()
    ) {
      let riskScore = 0;
      let anomalies = [];

      // Debit/Credit mismatch
      if (entry.debit !== entry.credit) {
        riskScore += 0.5;

        anomalies.push({
          field: "debit",
          anomalyType: "balance_error",
          message: "Debit and Credit are not balanced",
        });
      }

      // Weekend posting
      const day = new Date(entry.postingDate).getDay();

      if (day === 0 || day === 6) {
        riskScore += 0.2;

        anomalies.push({
          field: "postingDate",
          anomalyType: "weekend_posting",
          message: "Transaction posted on weekend",
        });
      }

      // Large transaction
      if (entry.amount > 100000) {
        riskScore += 0.3;

        anomalies.push({
          field: "amount",
          anomalyType: "high_amount",
          message: "Large transaction amount",
        });
      }

      let riskLevel = "LOW";

      if (riskScore >= 0.7) {
        riskLevel = "HIGH";
      } else if (riskScore >= 0.4) {
        riskLevel = "MEDIUM";
      }

      await JournalEntry.updateOne(
        { _id: entry._id },
        {
          $set: {
            riskScore,
            riskLevel,
            anomalyDetected: anomalies.length > 0,
            anomalies,
          },
        }
      );

      count++;

      console.log(`Updated ${entry.entryNo}`);
    }

    console.log(`✅ Finished (${count} records)`);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateRiskScores();