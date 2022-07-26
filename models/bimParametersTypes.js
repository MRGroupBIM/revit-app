const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bimParametersTypes = new Schema ({
    index: { type: String, index: true },
    name: {
        ru: String,
        en: String,
        de: String
    },
    description: {
        ru: String,
        en: String,
        de: String
    },
    hashName: {
        ru: String,
        en: String,
        de: String
    }
});

const bimParametersTypes = mongoose.model('bimParametersTypes', bimParametersTypes);

module.exports = bimParametersTypes;