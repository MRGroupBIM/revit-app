const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parameterSchema = require ('parameterSchema');



const LayerSchema = new Schema ({
    number: Number,
    materialType: String, //assign to material types DB
    baseQuantities: String, //rule assign to BIM parameters
    material: String, //assign to material DB
    parameters:[parameterSchema] //optional additional parameters for describe this layer on WORKNAME
});

const workItemSchema = new Schema({
    id: { type: String, index: true },
    locked: Boolean,
    code: Array, //list of codes BIM objects
    baseQuantities: String, //rule assign to BIM parameters
    name: String,
    layers: [LayerSchema],
    parameters: [ParameterSchema]
});


const workItem = mongoose.model('Works', workItemSchema);

module.exports = workItem;