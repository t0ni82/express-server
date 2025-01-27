alert("Hola desde una app de Node.js");
function fetchUsers() {
  fetch("/api/v1/users")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error fetching users:", error));
}

// fetchUsers();

function fetchUserById(id) {
  fetch(`/api/v1/users/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error fetching user by id:", error));
}

function createUser(userData) {
  fetch("/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User created:", data);
    })
    .catch((error) => console.error("Error creating user:", error));
}

function updateUserById(id, userData) {
  fetch(`/api/v1/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User updated:", data);
    })
    .catch((error) => console.error("Error updating user:", error));
}

function deleteUserById(id) {
  fetch(`/api/v1/users/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User deleted:", data);
    })
    .catch((error) => console.error("Error deleting user:", error));
}
