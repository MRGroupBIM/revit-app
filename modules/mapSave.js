function mapSave(obj, callback) {
    const MAP = require('../models/MAPPING');
    MAP.findOneAndUpdate({ session: obj.session},{mapping: obj.mapping},{upsert: true, new: true, returnNewDocument: true},function (err,doc) {
        if (!err){console.log("Mapping saved");}
        if (err) {throw err;}
        callback(doc)
    });
}

module.exports = mapSave;