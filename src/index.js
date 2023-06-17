const express = require('express');
const PORT = 3000
const app = express();
const routes = require('./routes');
const {errorHandler} = require('./middlewares/errorHandlerMiddleware');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { auth } = require('./middlewares/authMiddleware')

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
app.use(cookieParser())
app.use(auth)
app.use(routes)
//app.use(errorHandler)


app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))