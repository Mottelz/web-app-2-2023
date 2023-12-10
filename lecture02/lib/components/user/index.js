const bcrypt = require('bcrypt');

const encrypt = async (password) => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
};

const verifyPassword = async (password, encryptedPassword) => {
    const result = await bcrypt.compare(password, encryptedPassword);
    return result;
};

module.exports = {
    encrypt,
    verifyPassword
};