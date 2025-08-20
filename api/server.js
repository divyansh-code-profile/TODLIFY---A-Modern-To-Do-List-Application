require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Todo = require("./models/Todo");
const User = require("./models/User");
const initializeReminderScheduler = require("./schedule");

const app = express();
const port = process.env.PORT || 3001;
const saltRounds = 10;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully connected to the database.");
    // Start the reminder service after DB connection is established
    initializeReminderScheduler();
  })
  .catch((err) => console.error("Database connection error:", err));

// --- Authentication Middleware ---
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Authentication invalid: No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
        return res.status(404).json({ msg: "User not found." });
    }

    req.user = user; // Attach user object to request
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Authentication invalid: Token is not valid." });
  }
};

// --- API Routes ---

// -- Auth Routes --
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please provide all required fields." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error during signup.", error });
  }
});

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ msg: "Please provide email and password." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials." });
        }

        const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, {
            expiresIn: '1d', // Token expires in 1 day
        });

        res.json({
            token,
            name: user.name,
        });
    } catch (error) {
        res.status(500).json({ msg: "Server error during signin.", error });
    }
});

// -- To-Do Routes --
app.get("/to-do-app", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ user_id: req.user._id }).sort({ start_date: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching tasks." });
  }
});

app.post("/to-do-app/new", authMiddleware, async (req, res) => {
  try {
    const taskData = { ...req.body, user_id: req.user._id };
    const task = await Todo.create(taskData);
    res.status(201).json({ task });
  } catch (error) {
    res.status(400).json({ msg: "Error creating task.", error });
  }
});

app.delete("/to-do-app/delete/:id", authMiddleware, async (req, res) => {
  try {
    const result = await Todo.findOneAndDelete({ _id: req.params.id, user_id: req.user._id });
    if (!result) {
        return res.status(404).json({ msg: "Task not found or user not authorized." });
    }
    res.json({ msg: "Task deleted successfully.", result });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting task." });
  }
});

app.put("/to-do-app/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
        { _id: req.params.id, user_id: req.user._id },
        req.body,
        { new: true, runValidators: true } // Return the updated doc and run schema validators
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found or user not authorized." });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ msg: "Error updating task." });
  }
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));