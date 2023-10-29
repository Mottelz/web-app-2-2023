const router = require('express').Router();
const db = require('./data.js');

// get all clients
router.get('/all', async (req, res) => {
    const clients = await db.getClients();
    res.json({clients: clients});
});

// get a client by id
router.get('/id/:id', async (req, res) => {
    const client = await db.getClientById(req.params.id);
    res.json({client: client});
});

// get a client by name
router.get('/name/:name', async (req, res) => {
    const client = await db.getClientByName(req.params.name);
    res.json({client: client});
});

// get a client by email
router.get('/email/:email', async (req, res) => {
    const client = await db.getClientByEmail(req.params.email);
    res.json({client: client});
});

// search for a client by name
router.get('/search/:name', async (req, res) => {
    const clients = await db.searchClientsByName(req.params.name);
    res.json({clients: clients});
});

// add a client
router.post('/', async (req, res) => {
    const info = await db.addClient(
        req.body.name, 
        req.body.address, 
        req.body.phone, 
        req.body.email
    );
    res.json({info: info});
});


module.exports = router;