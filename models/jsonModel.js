const mongoose = require('mongoose');

const jsonModelSchema = new mongoose.Schema({
    data: {
        type: Object,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('JsonModel', jsonModelSchema);