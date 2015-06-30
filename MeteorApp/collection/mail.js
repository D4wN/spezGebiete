Mail = new Mongo.Collection('mail');

Schema = {};
Schema.mailType = new SimpleSchema({
    sender: {
        type: String,
        optional: true
    },
    recipients: {
        type: [String],
        optional: true
    },
    cc: {
        type: [String],
        optional: true
    },
    text: {
        type: String
    },
    mid: {
        type: String,
        optional: true
    },
    fpath: {
        type: String,
        optional: true
    },
    bcc: {
        type: [String],
        optional: true
    },
    to: {
        type: [String],
        optional: true
    },
    replyto: {
        type: [String],
        optional: true
    },
    ctype: {
        type: String,
        optional: true
    },
    date: {
        type: String,
        optional: true
    },
    folder: {
        type: String
    },
    subject: {
        type: String,
        optional: true
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

        var selector = {text: text, folder: folder};

        Mail.insert(selector);
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

        console.log(mailID);
        console.log(folder);

       var mail =  Mail.findOne(mailID);
        Mail.update(mail._id, folder);
    }

});