const router = require('express').Router();
const db = require('./data.js');
const controller = require('./index.js');

router.post('/create', async (req, res) => {
    const { username, password } = req.body;
    const encryptedPassword = await controller.encrypt(password);
    const result = await db.createUser(username, encryptedPassword);
    res.json(result);
});

router.post('/delete', async (req, res) => {
    const { username } = req.body;
    const result = await db.deleteUser(username);
    res.json(result);
});


router.post('/update/password', async (req, res) => {
    const { username, password } = req.body;
    const encryptedPassword = await controller.encrypt(password);
    const result = await db.updatePassword(username, encryptedPassword);
    res.json(result);
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.getUser(username);
    if (user) {
        const isCorrectPassword = await controller.verifyPassword(password, user.password);
        if (isCorrectPassword) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } else {
        res.json({ success: false });
    }
});

module.exports = router;