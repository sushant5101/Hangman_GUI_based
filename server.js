const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

let rawData = fs.readFileSync(path.join(__dirname, 'data.json'));
let jsonData = JSON.parse(rawData);

app.get('/health', (req, res) => {
    res.send('Server is healthy');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = jsonData.users.find(user => user.username === username && user.password === password);

    if (user) {
        res.send({ success: true, message: 'Login successful' });
    } else {
        res.send({ success: false, message: 'Invalid username or password' });
    }
});

app.get('/data', (req, res) => {
    res.json(jsonData);  // Use res.json() to send JSON response
});

app.post('/data', (req, res) => {
    const { username, password } = req.body;
    const existingUser = jsonData.users.find(user => user.username === username);

    if (existingUser) {
        res.status(400).json({ success: false, message: 'Username already exists' });
    } else {
        jsonData.users.push({ username, password });

        fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing file');
            } else {
                res.send({ success: true, message: 'User added successfully' });
            }
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
