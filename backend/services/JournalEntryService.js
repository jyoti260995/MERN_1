const journalEntryRepository = require("../repositories/JournalEntryRepository");
const enrichmentWorker = require("../workers/EnrichmentWorker");

class JournalEntryService {
  async createEntry(data) {
    const entry = await journalEntryRepository.create(data);

    enrichmentWorker.processEntry(entry._id);

    return entry;
  }

  async getAllEntries() {
    return await journalEntryRepository.getAll();
  }

  async getEntryById(id) {
    return await journalEntryRepository.getById(id);
  }

  async updateEntry(id, data) {
    const oldEntry = await journalEntryRepository.getById(id);

    if (!oldEntry) {
      return null;
    }

    const financialFields = [
      "amount",
      "description",
      "glNumber",
      "postingDate",
      "debit",
      "credit",
    ];

    let shouldRecompute = false;

    financialFields.forEach((field) => {
      if (
        data[field] !== undefined &&
        data[field] != oldEntry[field]
      ) {
        shouldRecompute = true;
      }
    });

    const updatedEntry = await journalEntryRepository.update(id, data);

    if (shouldRecompute) {
      updatedEntry.status = "PENDING";
      updatedEntry.riskScore = 0;
      updatedEntry.riskLevel = "LOW";
      updatedEntry.anomalyDetected = false;

      updatedEntry.anomalies = [];
      updatedEntry.semanticVector = [];
      updatedEntry.financialVector = [];
      updatedEntry.entityVector = [];

      await updatedEntry.save();

      enrichmentWorker.processEntry(updatedEntry._id);
    }

    return updatedEntry;
  }

  // ===================================
  // Scenario E - Metadata Update
  // ===================================

  async updateMetadata(id, data) {
    return await journalEntryRepository.updateMetadata(id, data);
  }

  async deleteEntry(id) {
    return await journalEntryRepository.delete(id);
  }

  async getDashboardStats() {
    const entries = await journalEntryRepository.getAll();

    return {
      totalEntries: entries.length,

      completed: entries.filter(
        (entry) => entry.status === "COMPLETED"
      ).length,

      processing: entries.filter(
        (entry) => entry.status === "PROCESSING"
      ).length,

      pending: entries.filter(
        (entry) => entry.status === "PENDING"
      ).length,

      highRisk: entries.filter(
        (entry) => entry.riskLevel === "HIGH"
      ).length,

      mediumRisk: entries.filter(
        (entry) => entry.riskLevel === "MEDIUM"
      ).length,

      lowRisk: entries.filter(
        (entry) => entry.riskLevel === "LOW"
      ).length,

      anomalies: entries.filter(
        (entry) => entry.anomalyDetected
      ).length,
    };
  }

  // ===================================
  // Similarity Search (POST API)
  // ===================================

  async searchSimilarEntries(entryId, strategy) {
    const baseEntry = await journalEntryRepository.getById(entryId);

    if (!baseEntry) {
      throw new Error("Journal Entry not found");
    }

    const entries = await journalEntryRepository.getAllExcept(entryId);

    let vectorField = "semanticVector";

    if (strategy === "financial") {
      vectorField = "financialVector";
    }

    if (strategy === "entity") {
      vectorField = "entityVector";
    }

    const baseVector = baseEntry[vectorField];

    const similarity = (v1, v2) => {
      if (!v1.length || !v2.length) return 0;

      let sum = 0;

      for (let i = 0; i < v1.length; i++) {
        sum += Math.abs(v1[i] - v2[i]);
      }

      return 1 / (1 + sum);
    };

    const results = entries.map((entry) => ({
      entry,
      score: similarity(baseVector, entry[vectorField]),
    }));

    results.sort((a, b) => b.score - a.score);

    return results.slice(0, 5);
  }

  // ===================================
  // Similar Entries by GL Number (GET API)
  // ===================================

  async getSimilarEntries(glNumber) {
    const entries = await journalEntryRepository.getAll();

    const baseEntry = entries.find(
      (entry) => entry.glNumber === glNumber
    );

    if (!baseEntry) {
      throw new Error("Journal Entry not found");
    }

    const results = entries
      .filter((entry) => entry.glNumber !== glNumber)
      .map((entry) => ({
        entry,
        score: entry.riskScore,
      }));

    return results;
  }
}

module.exports = new JournalEntryService();