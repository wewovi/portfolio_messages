const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('messageModel', messageSchema);