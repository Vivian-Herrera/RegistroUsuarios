const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const dbPath = path.join(__dirname, 'users.json');

app.use(express.json());

// Obtener usuarios
app.get('/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  res.json(data);
});

// Registrar usuario
app.post('/register', (req, res) => {
  const users = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  users.push(req.body);
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
  res.status(201).json({ message: 'Usuario registrado' });
});

// Login
app.post('/login', (req, res) => {
  const users = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const found = users.find(
    u => u.email === req.body.email && u.password === req.body.password
  );
  if (found) res.json({ message: 'Login exitoso' });
  else res.status(401).json({ message: 'Credenciales incorrectas' });
});

app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));
