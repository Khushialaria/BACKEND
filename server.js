const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 4000; // Ensure you are using this port when testing

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dummy data
let pets = [
    { name: "Buddy", type: "Golden Retriever" },
    { name: "Mittens", type: "Persian Cat" }
];

let users = []; // To store adoption details

// Home route
app.get('/', (req, res) => {
    res.render('home', { pets });
});

// Pet Listing Page
app.get('/pet-listing', (req, res) => {
    res.render('pet-listing', { pets });
});

// Adoption Form Page
app.get('/adoption', (req, res) => {
    res.render('adoption', { pets });
});

// Handle Adoption Form Submission
app.post('/adopt', (req, res) => {
    const { name, pet } = req.body;

    if (!name || !pet) {
        return res.status(400).send('Please enter your name and select a pet.');
    }

    users.push({ name, pet });
    res.redirect('/dashboard');
});

// Dashboard Page
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { users });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
