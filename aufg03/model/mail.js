/**
 * Created by Merlen on 17.05.2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mailSchema = new Schema({
    _id: String,
    sender: String,
    recipients: Array,
    cc: Array,
    text: String,
    mid: String,
    fpath: String,
    bcc: Array,
    to: String,
    replyto: String,
    ctype: String,
    date: String,
    folder: String,
    subject: String
}, {collection: 'mail'});

var mail = mongoose.model('mail', mailSchema);


module.exports = mail;