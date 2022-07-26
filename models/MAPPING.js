/**
 * Created by ELEMIAN on 21.01.2022.
 */
/**
 * Created by ELEMIAN on 19.01.2022.
 */
/**
 * Created by ELEMIAN on 29.09.2021.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const mapSchema = new Schema ({
    session: {type: String}

});

const mappingTypes = mongoose.model('mapping', mapSchema);

module.exports = mappingTypes;