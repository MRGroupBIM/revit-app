const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const msgGet = require('../modules/msgGet');

router.post('/', function(req, res, next) {
    console.log("getMSG",req.body);
    if(req.body&&req.body.session&&req.sessionID&&req.sessionID==req.body.session){ //checking message from exist session
        msgGet(req.body,function (cb) {
            let obj = { //create object from sending
                messages: cb
            }
            if(req.session&&req.session.email){obj.email = req.session.email}//add the session email for using in the frontend
            res.send(obj)
        })
    }else{res.sendStatus(404);}
});


module.exports = router;
