const authRouter = require('./login');
const profileRouter = require('./greeting');
const logoutRouter = require('./logout');
const registerRouter = require('./register');

module.exports = [
    authRouter,
    profileRouter,
    logoutRouter,
    registerRouter
];
