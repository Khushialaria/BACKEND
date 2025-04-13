const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

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

    // Validation
    if (!name || !pet) {
        return res.status(400).render('error', {
            message: 'Please enter your name and select a pet.'
        });
    }

    // Check if selected pet exists
    const validPet = pets.find(p => p.name === pet);
    if (!validPet) {
        return res.status(400).render('error', {
            message: 'Selected pet is not available for adoption.'
        });
    }

    users.push({ name, pet });

    // Show success page
    res.render('success', { name, pet });
});

// Dashboard Page
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { users });
});

// 404 Error Handler
app.use((req, res) => {
    res.status(404).render('error', { message: 'Page not found!' });
});

// 500 Error Handler (server-side)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Something went wrong on the server!' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});