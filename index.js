require('dotenv').config();
var express = require('express');
var app = express();

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var cookieParser = require('cookie-parser');
var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var apiProductRoute = require('./api/routes/product.route');

var port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(cookieParser(process.env.MY_COOKIE));
app.use(sessionMiddleware);

app.get('/', function(req, res) {
    res.render('index', {
        name : 'AAA'
    });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/api/products', apiProductRoute);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});