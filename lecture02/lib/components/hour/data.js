const db = require('../../core/database.js').db;
const { toUTCDayStart, toUTCDayEnd } = require('./index.js');

// add hours to the database
const addHours = async (clientId, timeIn, timeOut) => {
    const stmt = db.prepare('INSERT INTO hours (client_id, time_in, time_out) VALUES (?, ?, ?)');
    const info = await stmt.run(clientId, date, hours);
    return info;
};

// get hours by client id from the database
const getHoursByClientId = async (clientId) => {
    const stmt = db.prepare('SELECT * FROM hours WHERE client_id = ?');
    const info = await stmt.all(clientId);
    return info;
};

// get hours by date from the database
const getHoursByDate = async (date) => {
    const day_start = toUTCDayStart(date);
    const day_end = toUTCDayEnd(date);
    const stmt = db.prepare('SELECT * FROM hours WHERE time_in BETWEEN ? AND ?');
    const info = await stmt.all(day_start, day_end);
    return info;
};

// get hours by date range from the database
const getHoursByDateRange = async (start, end) => {
    const day_start = toUTCDayStart(date);
    const day_end = toUTCDayEnd(date);
    const stmt = db.prepare('SELECT * FROM hours WHERE time_in BETWEEN ? AND ?');
    const info = await stmt.all(day_start, day_end);
    return info;
};

// get hours by client id and date from the database
const getHoursByClientIdAndDate = async (clientId, date) => {
    const day_start = toUTCDayStart(date);
    const day_end = toUTCDayEnd(date);
    const stmt = db.prepare('SELECT * FROM hours WHERE client_id = ? AND time_in BETWEEN ? AND ?');
    const info = await stmt.all(clientId, day_start, day_end);
    return info;
};

// get hours by id from the database
const getHoursById = async (id) => {
    const stmt = db.prepare('SELECT * FROM hours WHERE id = ?');
    const info = await stmt.get(id);
    return info;
};

// update hours by id in the database
const updateHoursById = async (id, clientId, timeIn, timeOut) => {
    const stmt = db.prepare('UPDATE hours SET client_id = ?, time_in = ?, time_out = ? WHERE id = ?');
    const info = await stmt.run(clientId, timeIn, timeOut, id);
    return info;
};

const addTimeOutById = async (id, timeOut) => {
    const stmt = db.prepare('UPDATE hours SET time_out = ? WHERE id = ?');
    const info = await stmt.run(timeOut, id);
    return info;
};

exports.module = {
    addHours,
    getHoursByClientId,
    getHoursByDate,
    getHoursByDateRange,
    getHoursByClientIdAndDate,
    getHoursById,
    updateHoursById,
    addTimeOutById
};