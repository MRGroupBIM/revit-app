const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const msgSave = require('../modules/msgSave');
const msgGet = require('../modules/msgGet');

router.get('/', function(req, res, next) {
    console.log("get",req.body.session,req.sessionID);
    if(req.body&&req.body.session&&req.sessionID&&req.sessionID==req.body.session){ //checking message from exist session
        msgGet(req.body.session,function (cb) {
            if(req.session.email){cb.email = req.session.email}
            res.send(cb)
        })
    }else{res.sendStatus(404);}
});

router.post('/', function(req, res, next) {
    if(req.body.email){req.session.email = req.body.email}
    console.log("post",req.body.session,req.sessionID);
    if(req.body&&req.body.session&&req.sessionID&&req.sessionID==req.body.session){ //checking message from exist session
        msgSave(req.body.code,req.body.layers,req.body.text,req.body.session,function (session) {
            res.send({session:session})
        })
    }else{res.sendStatus(404);}
});

module.exports = router;
