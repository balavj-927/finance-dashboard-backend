const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be positive"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type is required (income or expense)"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: [
        "salary",
        "freelance",
        "investment",
        "food",
        "transport",
        "utilities",
        "entertainment",
        "healthcare",
        "shopping",
        "education",
        "other",
      ],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false, // Soft delete support
    },
  },
  { timestamps: true }
);

// Always exclude soft-deleted records from queries
recordSchema.pre(/^find/, function () {
  this.find({ isDeleted: { $ne: true } });
});


const Record = mongoose.model("Record", recordSchema);
module.exports = Record;