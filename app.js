const express = require('express')
const session = require('express-session');
const dotenv = require('dotenv').config();
const csrf = require('csurf');
const path = require('path');

const app = express()

app.set('view engine', 'ejs')

app.use(session({
    secret: 'string secreto muy largo',
    resave: false,
    saveUninitialized: false
}))
// Middleware para utilizar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const csrfProtection = csrf();
app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
})

// Rutas
app.use("", require("./routes/home.routes"))

const rutasEmpleado = require("./routes/empleado.routes")
app.use('/user/empleado', rutasEmpleado)

const rutasUser = require("./routes/user.routes")
app.use('/user', rutasUser)

const rutasCliente = require("./routes/cliente.routes");
const { prepare } = require('./util/database');
app.use('/user/cliente', rutasCliente)


// Manejo de Errores 404
app.use((req, res, next) => {
    res.status(404).render('404')
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
