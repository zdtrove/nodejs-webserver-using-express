var express = require('express');
var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var users = [
    { id : 1, name : 'Hoang An' },
    { id : 2, name : 'My Duyen' }
]

app.get('/', function(req, res) {
    res.render('index', {
        name : 'AAA'
    });
});

app.get('/users', function(req, res) {
    res.render('users/index', {
        users : users
    });
});

app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matchedUser = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users : matchedUser
    });
});

app.get('/users/create', function(req, res) {
    res.render('users/create');
});

app.post('/users/create', function(req, res) {
    users.push(req.body);
    res.redirect("/users");
});

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});