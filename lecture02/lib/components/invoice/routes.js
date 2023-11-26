const router = require('express').Router();
const { toUTCDayStart } = require('../hour/index.js');
const db = require('./data.js');

// create invoice
router.post('/create', async (req, res) => {
    const clientId = req.body.clientId;
    const date = toUTCDayStart(new Date(req.body.date));
    const info = await db.createInvoice(clientId, date);
    res.json({id: info.lastInsertRowid});
});

// add hours to invoice
router.post('/add', async (req, res) => {
    const invoiceId = req.body.invoiceId;
    const hoursId = req.body.hoursId;
    const info = await db.addHoursToInvoice(invoiceId, hoursId);
    const invoice = await db.getInvoicesWithLinesById(invoiceId);
    res.json(invoice);
});

// get invoice by id
router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    const info = await db.getInvoiceById(id);
    res.json(info);
});

// get invoice with lines by id
router.get('/id/:id/full', async (req, res) => {
    const id = req.params.id;
    const info = await db.getInvoicesWithLinesById(id);
    res.json(info);
});

// mark invoice as paid by id
router.post('/paid/:id', async (req, res) => {
    const id = req.params.id;
    const date_paid = toUTCDayStart(new Date(req.body.date_paid));
    const info = await db.markInvoiceAsPaidById(id, date_paid);
    res.json({id: info.lastInsertRowid, date_paid: date_paid, status: 'success'});
});

module.exports = router;