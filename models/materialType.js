const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialClass = require("./materialClass");
const parameters = require("./parameterSchema");

const MaterialType = new Schema ({
    class: materialClass,
    code: Array, //array of applayable codes,
    parameters: [parameters],
    name: { //calculated name
        ru: String,
        en: String,
        de: String
    },
    hashName: { //hashed calculated name
        ru: String,
        en: String,
        de: String
    }
});

const materialType = mongoose.model('materialType', MaterialType);

module.exports = materialType;