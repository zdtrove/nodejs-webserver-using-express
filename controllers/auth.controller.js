var db = require('../db');
var md5 = require('md5');

module.exports.login = function(req, res) {
    res.render('auth/login');
};

module.exports.postLogin = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({ email : email }).value();
    var hashedPassword = md5(password);
    console.log(hashedPassword);
    if (!user) {
        res.render('auth/login', {
            errors : [
                "User doesn't exists."
            ],
            values : req.body
        });
        return;
    }
    if (user.password !== hashedPassword) {
        res.render('auth/login', {
            errors : [
                "Wrong password."
            ],
            values : req.body
        });
        return;
    }
    res.cookie('userId', user.id);
    res.redirect('/users');
};