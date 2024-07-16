const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/route', (req, res) => {
    res.render('route');
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.post('/contact', async (req, res) => {
    const { name, email, query } = req.body;
    const newUser = new User({ name, email, query });
    try {
        await newUser.save();
        res.render('thankyou');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving user data.");
    }
});

router.get('/admin', (req, res) => {
    res.render('adminLogin');
});

router.post('/admin', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
        req.session.admin = true;
        res.redirect('/dashboard');
    } else {
        res.redirect('/admin');
    }
});

router.get('/dashboard', async (req, res) => {
    if (req.session.admin) {
        try {
            const users = await User.find({});
            res.render('dashboard', { users });
        } catch (err) {
            console.log(err);
            res.status(500).send("Error fetching user data.");
        }
    } else {
        res.redirect('/admin');
    }
});

module.exports = router;
