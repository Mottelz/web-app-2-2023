const db = require('../../core/database.js').db;

const createUser = async (username, password) => {
  const query = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  const result = await query.run(username, password);
  return result;
};

const deleteUser = async (username) => {
    const query = db.prepare('DELETE FROM users WHERE username = ?');
    const result = await query.run(username);
    return result;
};

const getUser = async (username) => {
    const query = db.prepare('SELECT * FROM users WHERE username = ?');
    const result = await query.get(username);
    return result;
};

const updatePassword = async (username, password) => {
    const query = db.prepare('UPDATE users SET password = ? WHERE username = ?');
    const result = await query.run(password, username);
    return result;
};

module.exports = {
    createUser,
    deleteUser,
    getUser,
    updatePassword
};