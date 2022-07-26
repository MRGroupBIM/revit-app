
function getWorks(obj, callback) {
    var TECH = require('../models/REST');
    let newobj = obj;
    if(newobj.code){
        TECH.find({"code":newobj.code}).exec(function (err,docs) {
            console.log(err);
            var arrayOf = [];
            docs.forEach(function (d) {
                arrayOf.push(JSON.parse(d.tech));
            });
            newobj.works = arrayOf;
            callback(newobj)
        });
    }else {
        TECH.find({}).exec(function (err,docs) {
            console.log(err);
            var arrayOf = [];
            docs.forEach(function (d) {
                arrayOf.push(JSON.parse(d.tech));
            });
            newobj.works = arrayOf;
            callback(newobj)
        });
    }

}

module.exports = getWorks;