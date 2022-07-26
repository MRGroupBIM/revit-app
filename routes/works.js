const express = require('express');
const router = express.Router();
const url = require('url');
const urlencode = require('urlencode');
const { v4: uuidv4 } = require('uuid');
const getWorks = require('../modules/getWorks2');
const checkWorks = require('../modules/checkWorks');
const mapGet = require('../modules/mapGet');

/* GET home page. */
router.get('/', function(req, res, next) {

    if(!req.session.id){req.session.id=uuidv4();}//if it is a new session - create id
    var urlstring = req.url;
    var queryObject = url.parse(urlstring,true).query;
    queryObject.session = req.session.id;
    if(queryObject.layers){queryObject.layers = JSON.parse(queryObject.layers)}
    if(queryObject.parameters){queryObject.parameters = JSON.parse(queryObject.parameters)}
    if(true){
        getWorks(queryObject, function (cb) {
            mapGet(cb,function (cb){
                checkWorks(cb, function (cb) {
                    if(true){ //if mapping request finished
                        var params =  {
                                code:cb.code,
                                works: cb.works,
                                layers: cb.layers,
                                session: cb.session,
                                category:cb.category,
                                mapping: cb.mapping,
                                parameters: cb.parameters,
                                selected: cb.selected,
                                mode: "work"
                        };
                        res.render('works', {
                           params: JSON.stringify(params)
                        });
                    }
                })
            })



        })

    }




});

module.exports = router;
