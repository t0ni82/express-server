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

//Actualizar un usuario por su id
app.put("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  users = users.map((user) => {
    if (user.id === parseInt(id)) {
      user.name = name;
    }
    return user;
  });
  res.json({ success: true, user });
});

//Eliminar un usuario por su id
app.delete("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  users = users.filter((user) => user.id !== parseInt(id));
  res.json({ success: true, message: "User deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
