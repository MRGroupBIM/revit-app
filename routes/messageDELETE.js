/**
 * Created by ELEMIAN on 26.01.2022.
 */
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const msgDelete = require('../modules/msgDELETE');


router.post('/', function(req, res, next) {
    console.log("deleteMSG",req.body);
    if(req.body&&req.body.session&&req.sessionID&&req.sessionID==req.body.session){
        msgDelete(req.body,function (session) {
            console.log("session aftter delete",session);
            res.send({session:session})
        })
    }else{res.sendStatus(404);}
});

module.exports = router;