/**
 * Created by ELEMIAN on 29.09.2021.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const restSchema = new Schema ({
    code: {type: String},
    guid: {type: String},
    thickness: {type: Number},
    tech: String
});

const techTypes = mongoose.model('techFrom', restSchema);

module.exports = techTypes;