function msgDelete(obj, callback) {
    const MAP = require('../models/MESSAGE');
    let session4send = obj.session;
    MAP.deleteOne({_id: obj.id},function (err,doc) {
        if (!err){console.log("Message deleted",doc);}
        if (err) {throw err;}
        callback(session4send)
    });
}

module.exports = msgDelete;