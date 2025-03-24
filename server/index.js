const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const app = express();
const PORT = 5000;
// Enable CORS for frontend app
app.use(cors({
    origin: 'http://localhost:4200',  // Allow Angular app only
    credentials: true
  }));
  
app.use(express.json());// Parse incoming JSON requests and put data in req.body

// Use defined routes under the '/api' prefix
// Example: '/api/register', '/api/todos', etc.
app.use('/api', authRoutes);
// -------------------------------
// Connect to MongoDB Atlas
// 
mongoose.connect('mongodb+srv://ohadtaizi111:OHAD963852@clustertodo.knar6.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTODO', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected'); // Log successful connection
        // Start the server only after DB is connected
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.error('Mongo error', err));
