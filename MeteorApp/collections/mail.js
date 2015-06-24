Mail = new Mongo.Collection('mail');

Mail.attachSchema(
    new SimpleSchema({
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
    })
);