module.exports.controller = function(app) {
    var twit = require('../helper_functions/twit_helper.js');

    app.get('/mention/:word',function(req,res){
        twit.searchByTerm(req.params.word,res);
    });

};
