// const express = require('express')

// const app = express()

// app.set('view engine', 'ejs')

// // Middleware para utilizar JSON
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Rutas
// app.use("", require("./routes/home.routes"))

// const rutasEmpleado = require("./routes/empleado.routes")
// app.use('/user/empleado', rutasEmpleado)

// const port = 3000;

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`)
// })

const{ app, BrowserWindow } = require('electron');
const express = require('express');
const ejse = require('ejs-electron');
const session = require('express-session');

const expressApp = express()

expressApp.use(session({
    secret: 'string secreto muy largo',
    resave: false,
    saveUninitialized: false
}))

expressApp.set('view engine', 'ejs')

// Middleware para utilizar JSON
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

// Rutas
expressApp.use("", require("./routes/home.routes"))

const rutasEmpleado = require("./routes/empleado.routes")
expressApp.use('/user/empleado', rutasEmpleado)

const rutasUser = require("./routes/user.routes")
expressApp.use('/user', rutasUser)

expressApp.use(express.static('public'));

const port = 3000;

expressApp.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
        }
    })

    win.loadURL(`http://localhost:${port}`);
}

app.whenReady().then(() => {
    createWindow();
})