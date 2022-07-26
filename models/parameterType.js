const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParameterType = new Schema ({
    name: {
        ru: String,
        en: String,
        de: String
    },
    description: {
        ru: String,
        en: String,
        de: String
    }
});

const ParameterItem = mongoose.model('ParameterType', ParameterType);

module.exports = ParameterItem;