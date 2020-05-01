const mongoose = require('mongoose');

const InformationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid:  {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String}
});

module.exports = mongoose.model('Information', InformationSchema);