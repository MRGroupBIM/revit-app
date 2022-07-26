const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParameterSchema = new Schema ({
    name: String,
    type: String, //assign to parameter types
    value: String, //for any values for parameters
    numbervalue: Number, //for searching and comparing with equation
    scale: Number,//coefficient for working process loss
    koeff: { //coefficient for normalising bim units to work units
        type: Number,
        required: true,
        default: 1
    },
    visible: Boolean, //if this parameter need to show in work description
    suffix: String, //showing before value
    preffix: String, //showing after value
    isQuantitiy: Boolean, // true for base quantitiy parameters
    isCostChange: Boolean // true for parameters who is can change cost
});

module.exports = ParameterSchema;