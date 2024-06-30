const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ExpressError = require('./util/expressError');
const ejsMate = require('ejs-mate');


const campgrounds = require('./routes/campgrounds.js') 
const reviews = require('./routes/reviews.js')

mongoose.connect('mongodb://127.0.0.1:27017/camp-vista', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs'); // to use the ejs template 
app.set('views', path.join(__dirname, 'views')); // where to find ejs files

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')))


app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

// for home page
app.get('/', (req, res) => {
    res.render('home');
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong";
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
});
