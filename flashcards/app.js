const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static('public'));

const mainRouter = require('./routes');
const cardsRouter = require('./routes/cards');

app.use(mainRouter);
app.use('/cards', cardsRouter);

app.use( ( req,res,next ) => {
    res.message = "This is Nothing";
    next();
});

app.use( ( req,res,next ) => {
    console.log( res.message );
    next();
});



app.use( ( req,res,next ) => {
    const err = new Error("Not Found")
    err.status = 404;
    next(err);
});

app.use( ( err,req,res,next ) => {
    res.locals.error = err;
    res.status = err.status;
    res.render('error');
});



app.listen(3000, () => {
    console.log("the application is running on localhost:3000!");
});