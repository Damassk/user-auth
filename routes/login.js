const express = require('express');
const router = express.Router();
const User = require(__dirname + '/../models/Users');

router.get('/login', async (req, res) => {
    let {login, password} = req.query;
    if (!login || !password) {
        return res.status(400).send({error: 'User login or password is missing'});
    }
    let user = await User.findOne({login: login});
    if (!user) {
        return res.status(404).send({error: 'User not found'});
    }
    if (await user.comparePassword(password)) {
        req.session.user = user;
        return res.send(user);
    }
    return res.status(400).send({error: 'User login or password is invalid'});
});

module.exports = router;
