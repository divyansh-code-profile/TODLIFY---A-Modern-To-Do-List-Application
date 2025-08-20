const mongoose = require("mongoose");
const User = require("./User");

const TodoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Title is required"],
    trim: true 
  },
  description: { 
    type: String, 
    required: [true, "Description is required"] 
  },
  status: { 
    type: String, 
    required: true,
    enum: ["New", "InProgress", "Completed", "OnHold"],
    default: "New"
  },
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Corrected ref to 'User'
    required: true
  },
  start_date: { 
    type: Date, 
    default: Date.now 
  },
  end_date: { 
    type: Date, 
    default: null 
  },
  email: { 
    type: String, 
    default: null,
    // Basic email validation
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  category: { 
    type: String, 
    default: "General",
    trim: true
  },
  priority: { 
    type: String, 
    default: "Normal",
    enum: ["Critical", "Urgent", "Normal"]
  },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model("Todo", TodoSchema);