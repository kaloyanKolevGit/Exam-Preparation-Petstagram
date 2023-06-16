const express = require('express');
const PORT = 5000
const app = express();
const routes = require('./routes');

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.get('/', (req, res) => {
    res.send('first action');
})

app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))