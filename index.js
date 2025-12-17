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

app.listen(5009, () => {
  console.log("Backend running on http://localhost:5009");
});
