const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import CORS middleware

const app = express();
const port = process.env.PORT || 3001; // Use environment variable for port

app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware

let rawData = fs.readFileSync(path.join(__dirname, 'data.json'));
let jsonData = JSON.parse(rawData);

// Health check endpoint (optional)
app.get('/health', (req, res) => {
    res.send('Server is healthy');
});

// Endpoint to handle login requests
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = jsonData.users.find(user => user.username === username && user.password === password);

    if (user) {
        res.send({ success: true, message: 'Login successful' });
    } else {
        res.send({ success: false, message: 'Invalid username or password' });
    }
});

// Endpoint to get JSON data
app.get('/data', (req, res) => {
    res.send(jsonData);
});

// Endpoint to save JSON data
app.post('/data', (req, res) => {
    const { name, password } = req.body;
    const existingUser = jsonData.users.find(user => user.username === name);

    if (existingUser) {
        res.status(400).send({ success: false, message: 'Username already exists' });
    } else {
        jsonData.users.push({ username: name, password });

        fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing file');
            } else {
                res.send({ success: true, message: 'User added successfully' });
            }
        });
    }
});

app.get('/', (req, res) => { res.send('Welcome to Hangman!'); });
app.listen(port, () => { console.log(`Server running at http://localhost:${port}`); });
