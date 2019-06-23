require('dotenv').config();
var express = require('express');
var app = express();

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cookieParser = require('cookie-parser');
var authMiddleware = require('./middlewares/auth.middleware');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(cookieParser(process.env.MY_COOKIE));

app.get('/', function(req, res) {
    res.render('index', {
        name : 'AAA'
    });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});