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

        //Finden duriteriern löschen TODO

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

    getMail: function (folderName) {
        console.log(folderName);
        var messageList = Mail.find(folderName).fetch();

        console.log(messageList.length);
        return messageList;
    }
});