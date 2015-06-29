Mail = new Mongo.Collection('mail');

Schema = {};
Schema.mailType = new SimpleSchema({
    sender: {
        type: String
    },
    recipients: {
        type: [String]
    },
    cc: {
        type: [String]
    },
    text: {
        type: String
    },
    mid: {
        type: String
    },
    fpath: {
        type: String
    },
    bcc: {
        type: [String]
    },
    to: {
        type: [String]
    },
    replyto: {
        type: [String]
    },
    ctype: {
        type: String
    },
    date: {
        type: String
    },
    folder: {
        type: String
    },
    subject: {
        type: String
    }
});

SimpleSchema.debug = true;

Mail.attachSchema(
    Schema.mailType
);


Meteor.methods({
    /*
     * CREATE BLOCK
     * */
    addMail: function (text, folder) {
        console.log("add Message" + folder + " " + text);

        Mail.insert({
            text: text,
            folder: folder
        });
    },

    /*
     * DELETE BLOCK
     * */
    deleteMail: function (mailId) {
        Mail.remove(mailId);
    },
    deleteFolder: function (folder) {
        Mail.find({folder: folder}).remove(
            function (err) {
                if (err) throw err;
            });
    },

    /*
     * UPDATE BLOCK
     * */
    updateFolder: function (taskId, setChecked) {
        Mail.update(taskId, {$set: {checked: setChecked}});
    },
    moveMail: function (mailID, folder) {
        Mail.findOne({_id: mailID},

            function (err, doc) {

                if (err) throw err;
                doc.folder = folder;
                doc.save();

            });
    },

    getMail: function(folderName){

        console.log("getMessage() client ");
        var key = 'folder';
        var  value = folderName;

        var selector = {};
        selector[key] = value;

        var messageList = Mail.find(
            selector
        );

        console.log(messageList);

        return messageList;
        /*Meteor.call("messageList", folderName ,function (error, result) {
            if (error) {
                console.log(error.reason);
            }
            else {
                console.log("msg data recieved");
                Session.set('msg', result);
            }
        });*/
    }
});