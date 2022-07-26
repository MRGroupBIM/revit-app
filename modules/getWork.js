/**
 * Created by ELEMIAN on 06.09.2021.
 */
const axios =  require('axios');
var urlencode = require('urlencode');
function getWorks(codeCategory,  callback) {
    var url = "https://devapi.absgroup.ru/bim360/hs/ExchangeRevit/GetFull/" +  urlencode(codeCategory);
    //console.log(url);
    const username = 'ExchangeRevit';
    const password = '64a9f3c1be4CE0EEFB549C5E338ABF36*';

    axios({
        method: "GET",
        url: url,
        auth: {
            username: username,
            password: password
        }

    }).then(function(cb) {
        //console.log(cb)
        callback(cb);
    }).catch(function(err) {
        callback(err);
    })
}

module.exports = getWorks;

