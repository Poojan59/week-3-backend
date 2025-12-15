const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5009;

app.use(cors()); // allow frontend
app.use(express.json());

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Poojan" },
    { id: 2, name: "Manan" },
    { id: 3, name: "Sneakers Elite User" },
    { id: 4, name: "Virpal"}
  ]);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
