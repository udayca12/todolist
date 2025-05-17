const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};
const connection = mongoose.connect(
  "mongodb+srv://udayshankarca2004:QQxokxscWvWHrqrv@cluster0.agtzd6d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.use(cors(corsOptions));
connection
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
app
  .get("/", (req, res) => {
    res.send("Hello World");
  })
  .listen(3000, () => {
    console.log("Server is running on port 3000");
  });

app.use(express.json());
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

// This is the endpoint to get all todos
// It receives a GET request and returns all todos in JSON format
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    // console.log(todos);
    return res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// This is the endpoint to add a new todo
// It receives a POST request with the todo text and completed status
app.post("/todos", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: false,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Todo not found" });
  }
});
