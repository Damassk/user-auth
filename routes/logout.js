const express = require('express');
const router = express.Router();

router.get('/logout', async (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        delete req.session.user;
        return res.send();
    }
    return res.status(401).send({error: 'User Unauthorized'});
});

module.exports = router;
