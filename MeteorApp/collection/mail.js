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

       /* Mail.insert({
            text: text,
            folder: folder
        });*/
    },

    /*
     * CREATE BLOCK
     * */
    findingMail: function (id) {
        console.log("find Message" + id);

        var mail = Mail.find(id).fetch();

        console.log(mail);
        return mail;
    },

    /*
     * DELETE BLOCK
     * */
    deleteMail: function (mailId) {
        Mail.remove(mailId);
    },
    deleteFolder: function (folder) {

        console.log("delete " + folder);
        //Finden duriteriern löschen TODO

        var allDocumentsForName =  Mail.find(folder).fetch();

        allDocumentsForName.forEach(function(email){
            Mail.remove(email._id);
        })
    },

    /*
     * UPDATE BLOCK
     * */
    renameFolder: function (folder, newName) {

        console.log(folder);
        console.log(newName);


        var allDocumentsForName =  Mail.find(folder).fetch();

        allDocumentsForName.forEach(function(email){
            Mail.update(email._id, newName);
        })

    },
    moveMail: function (mailID, folder) {
       var mail =  Mail.findOne(mailID);
        Mail.update(mail._id, folder);
    },

    getMail: function (folderName, limit) {
        console.log(limit);

        var messageList = Mail.find(folderName, limit).fetch();

        console.log(messageList.length);

        return messageList;
    },

    findFolder: function () {
        var folderList = _.uniq(Mail.find().fetch(), false, function (mails) {
            return mails.folder
        });

        return folderList;
    }

});