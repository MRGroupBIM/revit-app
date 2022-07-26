const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const msgSave = require('../modules/msgSave');


router.post('/', function(req, res, next) {
    console.log("postMSG",req.body);
    if(req.body&&req.body.session&&req.sessionID&&req.sessionID==req.body.session){
        msgSave(req.body,function (session) {
            res.send({session:session})
        })
    }else{res.sendStatus(404);}
});

module.exports = router;