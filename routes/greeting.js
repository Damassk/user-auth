const express = require('express');
const router = express.Router();
const User = require(__dirname + '/../models/Users');

router.get('/greeting', async (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        let user = await User.findOne({_id: req.session.user._id});
        return res.send(user);
    }
    return res.status(401).send({error: 'User Unauthorized'});
});

module.exports = router;
