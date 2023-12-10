const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./data.js');

const encrypt = async (password) => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
};

const verifyPassword = async (password, encryptedPassword) => {
    const result = await bcrypt.compare(password, encryptedPassword);
    return result;
};

const generateToken = async (user) => {
    const token = await jwt.sign({ user }, process.env.JWT_SECRET, {expiresIn: '1d'});
    return token;
};

const verifyUser = async (username) => {
    const result = await db.getUser(username);
    return result;
};

module.exports = {
    encrypt,
    verifyPassword,
    verifyUser,
    generateToken
};