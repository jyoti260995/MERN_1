require("dotenv").config();

const mongoose = require("mongoose");
const JournalEntry = require("../models/JournalEntry");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    // Delete old data
    await JournalEntry.deleteMany();

    const entries = [
      {
        postingDate: new Date("2026-06-20"),
        entryNo: "JE-1001",
        name: "ABC Traders Pvt Ltd",
        description: "Purchase of raw materials",
        amount: 125000,
        debit: 125000,
        credit: 125000,
        currency: "INR",
        glNumber: "400120",
        postingBy: "user_001",
        companyId: "company_001",
        userId: "user_001",
        sourceId: "upload_91",
        uploadId: "file_22",
      },
      {
        postingDate: new Date("2026-06-21"),
        entryNo: "JE-1002",
        name: "XYZ Pvt Ltd",
        description: "Cash Purchase",
        amount: 150000,
        debit: 150000,
        credit: 150000,
        currency: "INR",
        glNumber: "400121",
        postingBy: "user_002",
        companyId: "company_001",
        userId: "user_002",
        sourceId: "upload_92",
        uploadId: "file_23",
      },
      {
        postingDate: new Date("2026-06-22"),
        entryNo: "JE-1003",
        name: "ABC Technologies",
        description: "Purchase of laptops",
        amount: 250000,
        debit: 250000,
        credit: 250000,
        currency: "INR",
        glNumber: "400125",
        postingBy: "user_003",
        companyId: "company_001",
        userId: "user_003",
        sourceId: "upload_93",
        uploadId: "file_24",
      },
      {
        postingDate: new Date("2026-06-23"),
        entryNo: "JE-1004",
        name: "ABC Manufacturing Pvt Ltd",
        description: "Cash purchase of machinery",
        amount: 200000,
        debit: 200000,
        credit: 200000,
        currency: "INR",
        glNumber: "400130",
        postingBy: "user_004",
        companyId: "company_001",
        userId: "user_004",
        sourceId: "upload_94",
        uploadId: "file_25",
      },
    ];

    await JournalEntry.insertMany(entries);

    console.log("✅ Seed completed successfully");
    console.log(`Inserted ${entries.length} journal entries`);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();