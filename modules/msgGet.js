
function getMSG(obj, callback) {
    var MSG = require('../models/MESSAGE');
    MSG.find(
        { 'session': obj.session }
    ).exec(function (err,docs) {
        if (!err){console.log("Message readed");}
        if (err) {throw err;}
        callback(docs);
    });
}

module.exports = getMSG;