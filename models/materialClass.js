const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialClass = new Schema ({
    class: String, //volume, area, length, pcs
    name: {
        ru: String,
        en: String,
        de: String
    },
    hashName: {
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

const materialClass = mongoose.model('MaterialClass', MaterialClass);

module.exports = materialClass;