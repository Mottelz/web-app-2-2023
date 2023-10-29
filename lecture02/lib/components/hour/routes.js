const router = require('express').Router();
const db = require('./data.js');
const { toUTCFull } = require('./index.js');

// add hours
router.post('/add', async (req, res) => {
    const clientId = req.body.clientId;
    const timeIn = toUTCFull(new Date(req.body.timeIn));
    const timeOut = toUTCFull(new Date(req.body.timeOut));
    const info = await db.addHours(clientId, timeIn, timeOut);
    res.send(info);
});

// update hours by id
router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const clientId = req.body.clientId;
    const timeIn = toUTCFull(new Date(req.body.timeIn));
    const timeOut = toUTCFull(new Date(req.body.timeOut));
    const info = await db.updateHoursById(id, clientId, timeIn, timeOut);
    res.send(info);
});

// add time out by id
router.put('/timeout/:id', async (req, res) => {
    const id = req.params.id;
    const timeOut = toUTCFull(new Date(req.body.timeOut));
    const info = await db.addTimeOutById(id, timeOut);
    res.send(info);
});

// get hours by id
router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    const info = await db.getHoursById(id);
    res.send(info);
});

// get hours by client id
router.get('/client/:clientId', async (req, res) => {
    const clientId = req.params.clientId;
    const info = await db.getHoursByClientId(clientId);
    res.send(info);
});
