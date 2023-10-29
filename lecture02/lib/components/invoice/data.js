const db = require('../../core/database.js').db;

// create invoice
const createInvoice = async (clientId, date) => {
    const stmt = db.prepare('INSERT INTO invoices (client_id, date) VALUES (?, ?)');
    const info = await stmt.run(clientId, date);
    return info;
};

// add hours to invoice
const addHoursToInvoice = async (invoiceId, hoursId) => {
    const stmt = db.prepare('INSERT INTO invoice_lines (invoice_id, hours_id) VALUES (?, ?)');
    const info = await stmt.run(invoiceId, hoursId);
    return info;
};

// get invoice by id
const getInvoiceById = async (id) => {
    const stmt = db.prepare('SELECT * FROM invoices WHERE id = ?');
    const info = await stmt.get(id);
    return info;
};

// get hours by invoice id
const getHoursByInvoiceId = async (invoiceId) => {
    const stmt = db.prepare('SELECT * FROM invoice_lines WHERE invoice_id = ?');
    const info = await stmt.all(invoiceId);
    return info;
};

// get invoices by client id
const getInvoicesByClientId = async (clientId) => {
    const stmt = db.prepare('SELECT * FROM invoices WHERE client_id = ?');
    const info = await stmt.all(clientId);
    return info;
}

// get invoices with lines by client id
const getInvoicesWithLinesByClientId = async (clientId) => {
    const stmt = db.prepare('SELECT * FROM invoices WHERE client_id = ?');
    const info = await stmt.all(clientId);
    for (let i = 0; i < info.length; i++) {
        const lines = await getHoursByInvoiceId(info[i].id);
        info[i].lines = lines;
    }
    return info;
};

// get invoices with lines by id
const getInvoicesWithLinesById = async (id) => {
    const stmt = db.prepare('SELECT * FROM invoices WHERE id = ?');
    const info = await stmt.get(id);
    const lines = await getHoursByInvoiceId(info.id);
    info.lines = lines;
    return info;
};

// mark invoice as paid by id
const markInvoiceAsPaidById = async (id, date_paid) => {
    const stmt = db.prepare('UPDATE invoices SET date_paid = ? WHERE id = ?');
    const info = await stmt.run(date_paid, id);
    return info;
};

// export modules
module.exports = {
    createInvoice,
    addHoursToInvoice,
    getInvoiceById,
    getHoursByInvoiceId,
    getInvoicesByClientId,
    getInvoicesWithLinesByClientId,
    getInvoicesWithLinesById,
    markInvoiceAsPaidById
};