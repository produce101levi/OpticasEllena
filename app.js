const express = require('express')
const session = require('express-session');

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


// Rutas
app.use("", require("./routes/home.routes"))

const rutasEmpleado = require("./routes/empleado.routes")
app.use('/user/empleado', rutasEmpleado)

const rutasUser = require("./routes/user.routes")
app.use('/user', rutasUser)

const rutasCliente = require("./routes/cliente.routes")
app.use('/user/cliente', rutasCliente)

app.use(express.static('public'));

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})