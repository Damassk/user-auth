const express = require('express');
const router = express.Router();
const User = require(__dirname + '/../models/Users');

router.get('/register', async (req, res) => {
    let {login, password} = req.query;
    if (!login || !password) {
        return res.status(400).send({error: 'User login or password is missing'});
    }
    let user = await User.findOne({login: login});
    if (user) {
        return res.status(400).send({error: 'User already exits'});
    }
    else {
        let createdUser = await User.create({login: login, password: password});
        req.session.user = createdUser;
        return res.send(createdUser);
    }
});

module.exports = router;
