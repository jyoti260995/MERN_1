const JournalEntry = require("../models/JournalEntry");

class JournalEntryRepository {
  async create(data) {
    return await JournalEntry.create(data);
  }

  async getAll() {
    return await JournalEntry.find().sort({ createdAt: -1 });
  }

  async getById(id) {
    return await JournalEntry.findById(id);
  }

  async update(id, data) {
    return await JournalEntry.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  // Scenario E - Metadata Update
  async updateMetadata(id, data) {
    return await JournalEntry.findByIdAndUpdate(
      id,
      {
        $set: {
          comments: data.comments,
          workflowStatus: data.workflowStatus,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async delete(id) {
    return await JournalEntry.findByIdAndDelete(id);
  }

  async findSimilar(glNumber) {
    return await JournalEntry.find({
      glNumber,
    });
  }

  // =====================================
  // Similarity Search Support
  // =====================================

  async getAllExcept(entryId) {
    return await JournalEntry.find({
      _id: { $ne: entryId },
    });
  }
}

module.exports = new JournalEntryRepository();