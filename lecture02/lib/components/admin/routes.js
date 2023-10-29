const express = require('express');
const router = express.Router();
const db = require('../../core/database.js');

router.get('/db/init', async (req, res) => {
    try {
        await db.init(); 
        res.send('Database initialized successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error initializing database');
    }
});

module.exports = router;
