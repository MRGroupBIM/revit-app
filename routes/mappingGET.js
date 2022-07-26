const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const mapGet = require('../modules/mapGet');

router.post('/', function(req, res, next) {
    console.log("getMAP",req.body);
    if(req.body&&req.body.session&&req.sessionID&&req.sessionID==req.body.session){ //checking message from exist session
        mapGet(req.body,function (cb) {
            console.log(cb)
            if(cb&&cb[0]&&cb[0].mapping&&cb[0].mapping.length>0){
                let obj = { //create object from sending
                    mapping: cb[0].mapping
                };
                res.send(obj)
            }else{
                let obj = { //create object from sending
                    mapping: [
                        {name: "Секция", nameInRevit: "OLIMP Секция"}
                    ]
                };
                res.send(obj)
            }

        })
    }else{res.sendStatus(404);}
});


module.exports = router;
