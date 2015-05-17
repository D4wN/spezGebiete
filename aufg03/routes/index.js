var express = require('express');
var router = express.Router();
var mail = require('../model/mail');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* GET all folder */
router.get('/folder', function (req, res, next) {
    mail.aggregate(
        [
            {$group: {_id: "$folder"}}
        ], function (err, data) {

            res.render('./new/allfolder', {folders: data});
        }
    ); // end aggregate
});

/* GET message of folder */
router.get('/folder/:name', function (req, res, next) {
    var name = req.params.name;
    mail.aggregate(
        [
            {$match: { folder: name }},
            {$group: {_id: "$text"}}
        ], function (err, data) {
            if (err) throw err;

            var text = [];
            for (var i = 0; i<data.length; i++){
                text.push(data[i]._id.slice(0, 50));
            }
            res.render('./new/foldermessage',{folder: name, messages: text});
        }
    ); //end aggregate
});

/*TODO DELETE folder and content */
router.delete('/folder/:name/', function (req, res, next) {
    var name = req.params.name;
    res.render('index', {title: 'Express'});
});

/*TODO UPDATE folder name */
router.put('/folder/:name/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* READ specific message TODO Show details */
router.get('/folder/:name/message/:id', function (req, res, next) {
    var name = req.params.name;
    var id = req.params.id;
    mail.aggregate(
        [
            {$match: { folder: name }},
            {$group: {_id: "$text"}}
        ], function (err, data) {
            if (err) throw err;
            var text = [];

            if (id < data.length){
                text = data[id]._id
            }

            res.render('./new/readmessage',{folder: name, message: text});
        }
    ); //end aggregate
});

/*TODO DELETE message */
router.delete('/folder/:name/message/:id', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/*TODO CREATE new message */
router.post('/folder/:name/message/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/*TODO UPDATE existing message */
router.put('/folder/:name/message/:id', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
