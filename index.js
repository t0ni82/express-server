const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Jack" },
];

//Obtener todos los usuarios
app.get("/api/v1/users", (req, res) => {
  res.json({ succes: true, users });
});

//Obtener un usuario po su id
app.get("/api/v1/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.json({ success: true, user });
});

//Crear un usuario
app.post("/api/v1/users", (req, res) => {
  const { name } = req.body; //{name: 'John'}
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }
  const newUser = { id: users.length + 1, name };
  users = [...users, newUser];
  res.status(201).json({ success: true, user: newUser });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
