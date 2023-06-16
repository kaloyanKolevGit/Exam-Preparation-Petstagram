const express = require('express');
const PORT = 5000
const app = express();
const routes = require('./routes');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/petstagram')
    .then(() => console.log('DB connection established'))
    .catch((error) => console.error(error))

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.set('views', 'src/views')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(routes)



app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))