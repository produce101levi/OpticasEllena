const express = require('express')

const app = express()

app.set('view engine', 'ejs')

// Middleware para utilizar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("", require("./routes/home.routes"))

const rutasEmpleado = require("./routes/empleado.routes")
app.use('/user/empleado', rutasEmpleado)

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})