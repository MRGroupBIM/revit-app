
function getMAP(obj, callback) {
    var MSG = require('../models/MAPPING');
    let newobj = obj;
    MSG.find(
        { 'session': newobj.session }
    ).exec(function (err,docs) {
        if (!err){console.log("Mapping readed",docs);}
        if(err) {throw err;}
        newobj.mapping = docs;
        callback(newobj);
    });
}

module.exports = getMAP;