/**
 * Created by ELEMIAN on 19.01.2022.
 */
/**
 * Created by ELEMIAN on 29.09.2021.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const msgSchema = new Schema ({
    code: {type: String},
    layers: {type: Object},
    text: {type: String},
    session: {type: String},
    category: {type: String},
    tech: {type: String}
});

const messageTypes = mongoose.model('message', msgSchema);

module.exports = messageTypes;