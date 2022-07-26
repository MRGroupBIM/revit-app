/**
 * Created by ELEMIAN on 21.01.2022.
 */
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const mapSave = require('../modules/mapSave');


router.post('/', function(req, res, next) {
    console.log("postMAP",req.body);
    if(req.body&&req.body.session&&req.sessionID&&req.sessionID==req.body.session){ //checking message from exist session
        mapSave(req.body, function (session) {
            res.send({session:session})
        })
    }else{res.sendStatus(404);}
});

module.exports = router;