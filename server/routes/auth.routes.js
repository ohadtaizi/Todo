const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Todo = require('../models/Todo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'yourSecretKey';


// Extracts user ID from the JWT token in the Authorization header
function getUserIdFromToken(req) {
    const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, SECRET);// Verify and decode the token
        return decoded.id;  // Assuming token contains { id: ... }
    } catch {
        return null;
    }
}
// ------------------------------
// Register Endpoint
// ------------------------------
router.post('/register', async (req, res) => {
    const { email, password } = req.body;// Get email and password from request body
    const hashed = await bcrypt.hash(password, 10); // Hash password before storing
    try {
        const newUser = await User.create({ email, password: hashed }); // Create user in DB
        res.json({ message: 'User registered', user: newUser });  // Send back success response
    } catch (err) {
        res.status(400).json({ error: 'Email already exists' });
    }
});
// ------------------------------
// Login Endpoint
// ------------------------------
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });  // Check if user exists
    if (!user) return res.status(400).json({ error: 'Invalid email' });

    const valid = await bcrypt.compare(password, user.password); // Compare password hashes
    if (!valid) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, SECRET); // Generate JWT with user ID
    res.json({ message: 'Logged in', token });// Return token to client
});

// ------------------------------
// Add New Todo 
// ------------------------------

router.post('/todo', async (req, res) => {
    const userId = getUserIdFromToken(req);// Extract user ID from token
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const { title, description } = req.body;// Get todo data
    try {
        const todo = new Todo({ title, description, userId });// Assign userId to associate with user
        await todo.save();// Save to DB
        res.json(todo);// Return created todo
    } catch (err) {
        res.status(400).json({ error: 'Error creating todo' });
    }
});
// ------------------------------
// Get All Todos for Logged-In User
// ------------------------------

router.get('/todos', async (req, res) => {
    const userId = getUserIdFromToken(req);// Get user ID from token
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const todos = await Todo.find({ userId });  // Fetch todos belonging to user
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Server error fetching todos' });
    }
});
// ------------------------------
// Get a Specific Todo by ID 
// ------------------------------
router.get('/todo/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id); // Find todo by MongoDB _id
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID' });
    }
});
// ------------------------------
// Update a Todo by ID 
// ------------------------------
router.put('/todo/:id', async (req, res) => {
    const userId = getUserIdFromToken(req);  // Validate token and get user ID
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
        const todo = await Todo.findOne({ _id: id, userId });  // Ensure only user's todo is updated
        if (!todo) return res.status(404).json({ error: 'Todo not found' });

        // Update only provided fields 
        todo.title = title ?? todo.title;
        todo.description = description ?? todo.description;
        todo.completed = completed ?? todo.completed;

        await todo.save(); // Save changes
        res.json(todo);  // Return updated todo
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID or update error' });
    }
});

module.exports = router;
