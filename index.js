var express = require('express');
var app = express();

var userRoute = require('./routes/user.route');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.render('index', {
        name : 'AAA'
    });
});

app.use('/users', userRoute);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});