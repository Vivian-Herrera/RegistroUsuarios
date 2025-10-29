const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const DB_PATH = process.env.DB_PATH || './db/users.json';
const SECRET = process.env.JWT_SECRET || 'default_secret';

function readUsers() {
  return JSON.parse(fs.readFileSync(DB_PATH));
}

function writeUsers(users) {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

async function register(req, res) {
  const { name, email, password } = req.body;
  const users = readUsers();
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Email ya registrado' });
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashed });
  writeUsers(users);
  res.status(201).json({ message: 'Usuario registrado' });
}

async function login(req, res) {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h' });
  res.json({ token });
}

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

function profile(req, res) {
  const users = readUsers();
  const user = users.find(u => u.email === req.user.email);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json({ name: user.name, email: user.email });
}

module.exports = { register, login, authMiddleware, profile };