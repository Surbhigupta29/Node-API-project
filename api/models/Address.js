const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid:  {type: String, required: true},
    address: {type: String}
});

module.exports = mongoose.model('Address', AddressSchema);