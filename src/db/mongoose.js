const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/jisooyu-task', {
    useNewUrlParser: true,
    useCreateIndex: true,
    userFindAndModigy: false
})
