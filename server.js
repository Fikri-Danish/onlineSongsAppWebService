// include the required packages
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const port = 3000;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
};

// intialize Express app
const app = express();
// helps app to read JSON
app.use(express.json());

app.listen(port, () => {
    console.log('Server running on port', port);
});

// Route: Get all songs
app.get('/allsongs', async (req, res) => {
    try {
        let connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM defaultdb.songs');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error for allsongs' });
    }
});

// Example Route: Create a new song
app.post('/addsong', async (req, res) => {
    const { song_name, song_artist, song_genre } = req.body;
    try {
        let connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO songs (song_name, song_artist, song_genre) VALUES (?, ?)', [song_name, song_artist, song_genre]);
        res.status(201).json({ message: 'Song '+song_name+' added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - could not add song '+song_name});
    }
});