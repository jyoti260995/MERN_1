const express = require("express");

const router = express.Router();

const journalEntryController = require("../controllers/JournalEntryController");

// ===============================
// Dashboard
// ===============================
router.get(
  "/dashboard/stats",
  journalEntryController.getDashboardStats
);

// ===============================
// Create Entry
// ===============================
router.post(
  "/",
  journalEntryController.createEntry
);

// ===============================
// Similarity Search (NEW)
// ===============================
router.post(
  "/search/similar",
  journalEntryController.searchSimilarEntries
);

// ===============================
// Get All Entries
// ===============================
router.get(
  "/",
  journalEntryController.getAllEntries
);

// ===============================
// Similar Entries by GL Number
// ===============================
router.get(
  "/similar/:glNumber",
  journalEntryController.getSimilarEntries
);

// ===============================
// Metadata Update
// ===============================
router.put(
  "/:id/metadata",
  journalEntryController.updateMetadata
);

// ===============================
// Get Single Entry
// ===============================
router.get(
  "/:id",
  journalEntryController.getEntryById
);

// ===============================
// Update Entry
// ===============================
router.put(
  "/:id",
  journalEntryController.updateEntry
);

// ===============================
// Delete Entry
// ===============================
router.delete(
  "/:id",
  journalEntryController.deleteEntry
);

module.exports = router;