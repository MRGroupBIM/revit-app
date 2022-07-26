
function msgSave(obj, callback) {
    const MSG = require('../models/MESSAGE');
    const NEWMSG = new MSG({
        code: obj.code,
        layers: obj.layers,
        text: obj.text,
        session: obj.session,
        category: obj.category
    });
    let session4send = obj.session;
    NEWMSG.save(function (err,doc) {
        if (!err){console.log("Сообщение сохранено");}
        if (err) {throw err;}
        callback(session4send)
    });
}

module.exports = msgSave;