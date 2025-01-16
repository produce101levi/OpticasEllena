const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');
const csrf = require('csurf');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const path = require('path');


app.use(session({
    secret: 'aF*AWE*$T78"rfsfgawe%*',
    resave: false,
    saveUninitialized: false,
  }));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const csrfProtection = csrf();
app.use(csrfProtection);

app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken(); 
    next();
});

app.listen(4000, () => {
    console.log("Example app listening on port 4000")
})