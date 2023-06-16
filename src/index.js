const express = require('express');
const PORT = 5000
const app = express();
const routes = require('./routes');

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(routes)



app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))