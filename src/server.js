// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authMiddleware = require('./middlewares/authMiddleware');
const port = process.env.PORT || 80;
const app = express();
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb+srv://huyngovoquang:8LqONnokekwDmr9D@grabfood.agpqcez.mongodb.net/?retryWrites=true&w=majority&appName=GrabFood', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

const publicDirectoryPath = path.join(__dirname, '../public');
global.publicDirectoryPath = publicDirectoryPath;

const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '../.env')})

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDirectoryPath));

const authRoutes = require('./routes/AuthRoutes');
const indexRoutes = require('./routes/IndexRoutes');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    const secret_key = process.env.SECRET_KEY;
    console.log(`Server is running on port ${port}`);
});