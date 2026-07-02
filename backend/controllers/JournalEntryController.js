const journalEntryService = require("../services/JournalEntryService");

class JournalEntryController {
  async createEntry(req, res) {
    try {
      const entry = await journalEntryService.createEntry(req.body);

      res.status(201).json({
        success: true,
        message: "Journal Entry Created Successfully",
        data: entry,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllEntries(req, res) {
    try {
      const entries = await journalEntryService.getAllEntries();

      res.status(200).json({
        success: true,
        count: entries.length,
        data: entries,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getEntryById(req, res) {
    try {
      const entry = await journalEntryService.getEntryById(req.params.id);

      if (!entry) {
        return res.status(404).json({
          success: false,
          message: "Journal Entry not found",
        });
      }

      res.status(200).json({
        success: true,
        data: entry,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateEntry(req, res) {
    try {
      const entry = await journalEntryService.updateEntry(
        req.params.id,
        req.body
      );

      if (!entry) {
        return res.status(404).json({
          success: false,
          message: "Journal Entry not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Journal Entry Updated Successfully",
        data: entry,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Scenario E - Metadata Update
  async updateMetadata(req, res) {
    try {
      const entry = await journalEntryService.updateMetadata(
        req.params.id,
        req.body
      );

      if (!entry) {
        return res.status(404).json({
          success: false,
          message: "Journal Entry not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Metadata Updated Successfully",
        data: entry,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ======================================
  // Similarity Search
  // ======================================
  async searchSimilarEntries(req, res) {
    try {
      const { entryId, strategy } = req.body;

      const results =
        await journalEntryService.searchSimilarEntries(
          entryId,
          strategy
        );

      res.status(200).json({
        success: true,
        count: results.length,
        data: results,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteEntry(req, res) {
    try {
      const entry = await journalEntryService.deleteEntry(req.params.id);

      if (!entry) {
        return res.status(404).json({
          success: false,
          message: "Journal Entry not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Journal Entry Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getSimilarEntries(req, res) {
    try {
      const entries = await journalEntryService.getSimilarEntries(
        req.params.glNumber
      );

      res.status(200).json({
        success: true,
        count: entries.length,
        data: entries,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getDashboardStats(req, res) {
    try {
      const stats = await journalEntryService.getDashboardStats();

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new JournalEntryController();