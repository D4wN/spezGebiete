var express = require('express');
var router = express.Router();
var mail = require('../model/mail');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Mail List'});
});

/* GET all folder */
router.get('/folder:json*?', function (req, res, next) {
    var opt = req.params.json;
    if (opt == ".json" || opt == null) {
        console.log(opt);
        console.log("show all folder");
        mail.aggregate(
            [
                {$group: {_id: "$folder"}}
            ], function (err, data) {
                if (opt == ".json") {
                    res.json(data);
                    return;
                }

                //res.render('./new/allfolder', {folders: data});
                res.json(data);
            }
        ); // end aggregate
    } else next();
});

router.route('/folder/:name.json')
    /* GET message of folder */
    .get(function (req, res, next) {
        console.log("show all messagses in folder as json: " + req.params.name);
        var name = req.params.name;
        mail.aggregate(
            [
                {$match: {folder: name}},
                {$group: {_id: "$_id", _text: {$push: "$text"}}}
            ], function (err, data) {
                if (err) throw err;

                res.json(data);


            }
        )//end aggregate
    });


/*folder by name route*/
router.route('/folder/:name/')
    /* GET message of folder */
    .get(function (req, res, next) {
        var opt = req.params.json;
        console.log(opt);
        if (opt == ".json" || opt == null) {
            console.log("show all messagses in folder: " + req.params.name);
            var name = req.params.name;
            mail.aggregate(
                [
                    {$match: {folder: name}},
                    {$group: {_id: "$_id", _text: {$push: "$text"}}}
                ], function (err, data) {
                    if (err) throw err;

                    var content = [];
                    var id = [];
                    for (var i = 0; i < data.length; i++) {
                        id.push(data[i]._id);
                        if (data[i]._text[0] != null) {
                            content.push(data[i]._text[0].slice(0, 50));
                        } else {
                            content.push("Text was null");
                        }
                        //console.log(data[i]);//._text[0].slice(0, 50))
                    }

                    if (opt == ".json") {
                        res.json(data);
                        return;
                    }
                    res.json(data);
                    //res.render('./new/foldermessage', {folder: name, messages: content, id: id});
                }
            ); //end aggregate
        } else next();
    })
    /*DELETE folder and content */
    .delete(function (req, res, next) {
        console.log("delete folder: " + req.params.name);
        var name = req.params.name;
        if (name == "null") name = null;

        mail.find({folder: name}).remove(
            function (err) {
                if (err) throw err;

                res.send(JSON.stringify({ status: "deleted" }));
                //res.redirect("/folder/");
            }); //end remove
    })
    /*UPDATE folder name */
    .put(function (req, res, next) {
        console.log("update folder: " + req.params.name);
        mail.update({folder: req.params.name},
            {$set: {folder: req.body.changed}},
            {multi: true},
            function (err, data) {
                if (err) throw err;

                res.send(data);
                //res.redirect("/folder/");
            }); //end update
    });


/* CREATE new message */
router.route('/newMessage')
    .get(function (req, res, next) {
        console.log("show Message Form");
        mail.aggregate(
            [
                {$group: {_id: "$folder"}}
            ], function (err, data) {
                res.render('./new/createmessage', {folders: data});
            }
        );
    })
    .post(function (req, res, next) {
        var text = req.body.newText;
        var folder = req.body.chose;
        var newMail = new mail({
            text: text,
            folder: folder
        });
        newMail.save(function (err, data) {
            if (err) throw err;
            res.json(data);
            //res.send(JSON.stringify({ delete: "succsessful" }));
            //res.redirect("/folder/" + folder);
        });
    });

router.route('/folder/:name/message/:id.json')
    /* READ specific message */
    .get(function (req, res, next) {
        console.log("read message: " + req.params.id);
        var name = req.params.name;
        var id = req.params.id;
        mail.aggregate(
            [
                {$match: {folder: name}},
                {$group: {_id: "$_id", _text: {$push: "$text"}, _folder: {$push: "$folder"}}}
            ], function (err, data) {
                if (err) throw err;
                if (id < data.length) {
                    mail.aggregate(
                        [
                            {$group: {_id: "$folder"}}
                        ], function (err, folder) {
                            res.json(data[id]);
                        }
                    ); // end aggregate
                } else {
                    res.send(JSON.stringify({ status: "not found" }));
                   // res.render("index", {title: "There is no message"});
                }


            }
        );//end aggregate
    });

/*message by id route*/
router.route('/folder/:name/message/:id')
    /* READ specific message*/
    .get(function (req, res, next) {
        console.log("read message: " + req.params.id);
        var name = req.params.name;
        var id = req.params.id;
        mail.aggregate(
            [
                {$match: {folder: name}},
                {$group: {_id: "$_id", _text: {$push: "$text"}, _folder: {$push: "$folder"}}}
            ], function (err, data) {
                if (err) throw err;
                if (id < data.length) {
                    mail.aggregate(
                        [
                            {$group: {_id: "$folder"}}
                        ], function (err, folder) {

                            res.json(data[id]);
                            /*res.render('./new/readmessage', {
                                folder: name,
                                data: data[id],
                                oldId: id,
                                folders: folder
                            });*/
                        }
                    ); // end aggregate
                } else {
                    res.send(JSON.stringify({ status: "not found" }));
                    //res.render("index", {title: "There is no message"});
                }

            }
        );//end aggregate
    })
    /*DELETE message */
    .delete(function (req, res, next) {
        console.log("delete: " + req.params.id);

        mail.find({_id: req.params.id}).remove(
            function (err) {
                if (err) throw err;

                res.send(JSON.stringify({ status: "deleted" }));
                //res.redirect("/folder/" + req.params.name);
            }); //end remove
    })
    /*Move existing message */
    .put(function (req, res, next) {
        mail.findOne({_id: req.params.id},
            function (err, doc) {
                if (err) throw err;
                doc.folder = req.body.chose;
                doc.save();
                res.json(doc);
                //res.redirect("/folder/" + req.body.chose);
            });
    });
module.exports = router;
