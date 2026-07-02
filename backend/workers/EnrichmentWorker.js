const JournalEntry = require("../models/JournalEntry");

class EnrichmentWorker {
  async processEntry(entryId) {
    try {
      console.log(`🚀 Processing Entry: ${entryId}`);

      // Simulate AI processing delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      const entry = await JournalEntry.findById(entryId);

      if (!entry) {
        console.log("❌ Entry not found");
        return;
      }

      // Mark as processing
      entry.status = "PROCESSING";
      await entry.save();

      // =============================
      // Risk Score Calculation
      // =============================

      let riskScore = 0.2;

      if (entry.debit !== entry.credit) {
        riskScore += 0.5;
      }

      if (entry.amount > 100000) {
        riskScore += 0.2;
      }

      const postingDay = new Date(entry.postingDate).getDay();

      // Sunday
      if (postingDay === 0) {
        riskScore += 0.1;
      }

      riskScore = Math.min(riskScore, 1);

      // =============================
      // Risk Level
      // =============================

      let riskLevel = "LOW";

      if (riskScore >= 0.7) {
        riskLevel = "HIGH";
      } else if (riskScore >= 0.4) {
        riskLevel = "MEDIUM";
      }

      // =============================
      // Anomaly Detection
      // =============================

      const anomalies = [];

      if (entry.debit !== entry.credit) {
        anomalies.push({
          field: "debit/credit",
          anomalyType: "balance_error",
          message: "Debit and Credit are not balanced",
        });
      }

      if (entry.amount > 100000) {
        anomalies.push({
          field: "amount",
          anomalyType: "numeric_outlier",
          message: "Large transaction amount detected",
        });
      }

      if (
        entry.description &&
        entry.description.toLowerCase().includes("cash")
      ) {
        anomalies.push({
          field: "description",
          anomalyType: "semantic_anomaly",
          message: "Cash related transaction",
        });
      }

      // =============================
      // Generate Mock AI Vectors
      // =============================

      const generateVector = () =>
        Array.from({ length: 16 }, () =>
          Number(Math.random().toFixed(4))
        );

      // =============================
      // Update Entry
      // =============================

      entry.riskScore = riskScore;
      entry.riskLevel = riskLevel;
      entry.anomalyDetected = anomalies.length > 0;
      entry.anomalies = anomalies;

      entry.semanticVector = generateVector();
      entry.financialVector = generateVector();
      entry.entityVector = generateVector();

      entry.status = "COMPLETED";

      await entry.save();

      console.log(`✅ Entry ${entry.entryNo} enriched successfully`);
    } catch (error) {
      console.error("❌ Worker Error:", error);
    }
  }
}

module.exports = new EnrichmentWorker();