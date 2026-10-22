const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Pour autoriser les requêtes d'Angular
app.use(express.json());

// Mémoire live du serveur
let todos = [
  { id: 1, title: 'Apprendre Angular', status: 'done' },
  { id: 2, title: 'Réussir mon exam', status: 'in progress' }
];
let nextId = 3;

// 1. Récupérer toutes les tâches
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// 2. Ajouter une tâche
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: nextId++,
    title: req.body.title,
    status: 'in progress' // par défaut
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 3. Modifier une tâche (titre ou statut)
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  
  if (index !== -1) {
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: 'Tâche non trouvée' });
  }
});

// 4. Supprimer une tâche
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('Serveur Node démarré sur http://localhost:3000');
});