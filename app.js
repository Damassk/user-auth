const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const userRouters = require('./routes/index');

const port = process.env.PORT || 3022;
const {MONGO_HOSTNAME = 'localhost', MONGO_PORT = '27017', MONGO_DB = 'userAuth'} = process.env;

const app = express();

mongoose.connect(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.once('open', () => {
    console.log('Server connected to MongoDB');
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: 'user_sid',
    secret: 'sessionfortestappsecretphrase',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 86400
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

app.use(userRouters);
// app.use(profileRouter);

app.use((req, res) => {
    res.status(404).send({error: 'Not Found'});
});

app.listen(port, () => {
    console.log(`Server start on port: ${port}`);
});
