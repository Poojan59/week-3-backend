const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: "Nike-T-shirt" },
  { id: 2, name: "Nike-watch" }
];

// GET API
app.get("/users", (req, res) => {
  res.json(users);
});

// POST API
app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);
  console.log("New user added:", newUser);

  res.json({ message: "User added successfully", user: newUser });
});
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = name;
  res.json({ message: "User updated successfully" });
});
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  users = users.filter(u => u.id !== id);

  res.json({ message: "User deleted successfully" });
});


app.listen(5009, () => {
  console.log("Backend running on http://localhost:5009");
});
