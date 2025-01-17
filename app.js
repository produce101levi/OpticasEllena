const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.use("", require("./routes/home.routes"))

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})