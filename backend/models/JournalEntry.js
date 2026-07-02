const mongoose = require("mongoose");

const anomalySchema = new mongoose.Schema(
  {
    field: {
      type: String,
    },
    anomalyType: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { _id: false }
);

const JournalEntrySchema = new mongoose.Schema(
  {
    postingDate: {
      type: Date,
      required: true,
    },

    transactionType: {
      type: String,
      default: "Journal Entry",
    },

    entryNo: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      required: true,
    },

    debit: {
      type: Number,
      required: true,
    },

    credit: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    glNumber: {
      type: String,
      required: true,
    },

    postingBy: {
      type: String,
      default: "",
    },

    companyId: {
      type: String,
      default: "",
    },

    userId: {
      type: String,
      default: "",
    },

    sourceId: {
      type: String,
      default: "",
    },

    uploadId: {
      type: String,
      default: "",
    },

    systemCreated: {
      type: Boolean,
      default: false,
    },

    uploadSourceType: {
      type: Number,
      default: 1,
    },

    // ===============================
    // AI Enrichment Fields
    // ===============================

    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "COMPLETED"],
      default: "PENDING",
    },

    riskScore: {
      type: Number,
      default: 0,
    },

    riskLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW",
    },

    anomalyDetected: {
      type: Boolean,
      default: false,
    },

    anomalies: {
      type: [anomalySchema],
      default: [],
    },

    semanticVector: {
      type: [Number],
      default: [],
    },

    financialVector: {
      type: [Number],
      default: [],
    },

    entityVector: {
      type: [Number],
      default: [],
    },

    modelVersion: {
      type: String,
      default: "v1",
    },

    // ===============================
    // Audit Metadata Fields
    // ===============================

    comments: {
      type: String,
      default: "",
    },

    workflowStatus: {
      type: String,
      enum: ["OPEN", "IN_REVIEW", "APPROVED", "REJECTED"],
      default: "OPEN",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JournalEntry", JournalEntrySchema);