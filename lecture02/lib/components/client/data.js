const db = require('../../core/database.js').db;

// add a client to the database
const addClient = async (name, address, phone, email) => {
    const stmt = db.prepare('INSERT INTO clients (name, address, phone, email) VALUES (?, ?, ?, ?)');
    const info = await stmt.run(name, address, phone, email);
    return info;
};

// get all clients from the database
const getClients = async () => {
    const stmt = db.prepare('SELECT * FROM clients');
    const info = await stmt.all();
    return info;
};

// get a client by id from the database
const getClientById = async  (id) => {
    const stmt = db.prepare('SELECT * FROM clients WHERE id = ?');
    const info = await stmt.get(id);
    return info;
};

// get a client by name from the database
const getClientByName = async (name) => {
    const stmt = db.prepare('SELECT * FROM clients WHERE name = ?');
    const info = await stmt.get(name);
    return info;
};

// get a client by email from the database
const getClientByEmail = async (email) => {
    const stmt = db.prepare('SELECT * FROM clients WHERE email = ?');
    const info = await stmt.get(email);
    return info;
};

// search for a client by name from the database
const searchClientsByName = async (name) => {
    const stmt = db.prepare('SELECT * FROM clients WHERE name LIKE ?');
    const info = await stmt.all(`%${name}%`);
    return info;
};

module.exports = {
    addClient,
    getClients,
    getClientById,
    getClientByName,
    getClientByEmail,
    searchClientsByName
};