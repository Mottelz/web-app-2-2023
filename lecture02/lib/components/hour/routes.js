const router = require('express').Router();
const db = require('./data.js');
const { toUTCFull } = require('./index.js');

// add hours
router.post('/add', async (req, res) => {
    const clientId = req.body.clientId;
    const timeIn = toUTCFull(new Date(req.body.timeIn));
    const timeOut = toUTCFull(new Date(req.body.timeOut));
    const info = await db.addHours(clientId, timeIn, timeOut);
    const hours = await db.getHoursById(info.lastInsertRowid);
    res.send({hours: hours});
});

// update hours by id
router.post('/update/:id', async (req, res) => {
    const id = req.params.id;
    const clientId = req.body.clientId;
    const timeIn = toUTCFull(new Date(req.body.timeIn));
    const timeOut = toUTCFull(new Date(req.body.timeOut));
    const info = await db.updateHoursById(id, clientId, timeIn, timeOut);
    const hours = await db.getHoursById(info.lastInsertRowid);
    res.send({hours: hours});
});

// add time out by id
router.post('/timeout/:id', async (req, res) => {
    const id = req.params.id;
    const timeOut = toUTCFull(new Date(req.body.timeOut));
    const info = await db.addTimeOutById(id, timeOut);
    const hours = await db.getHoursById(info.lastInsertRowid);
    res.send({hours: hours});
});

// get hours by id
router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    const info = await db.getHoursById(id);
    res.send({hours: info});
});

// get hours by client id
router.get('/client/:clientId', async (req, res) => {
    const clientId = req.params.clientId;
    const info = await db.getHoursByClientId(clientId);
    const client = await db.getClientById(clientId);
    res.send({client: client, hours: info});
});

module.exports = router;
