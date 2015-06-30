Meteor.subscribe("mails");

Template.body.helpers({
    Folder: function () {
        //return Session.get('Folder');

        //Meteor.call("findFolder", function (error, result) {
        //    if (error) {
        //        console.log(error.reason);
        //    }
        //    else {
        //        Session.set('Folder', result);
        //    }
        //});
        var folderList = _.uniq(Mail.find().fetch(), false, function (mails) {
            return mails.folder
        });
        Session.set("Folder", folderList);

        return Session.get('Folder')
    }
});

//###############################################################FOLDER
Template.folder.onCreated(function () {
    this._limit = 5;
});

Template.folder.helpers({
    hideFolderDiv: function () {
        var key = 'folder_' + this.folder + 'show';

        if (Session.get(key)) {
            //console.log("ID(TRUE)= " + this._id);
            return true;
        } else {
            //console.log("ID(FALSE)= " + this._id);
            return false;
        }
    },

    MessageList: function () {
        var msg = Session.get("msgList" + this.folder);
        return msg;
    }
});

Template.folder.events({
    "click .hideButtonFolder": function (event) {
        console.log("clicked! " + this.folder);

        //Session.set('msgList', [{subject: 'loading'}]);
        var folderName = this.folder;
        var limit = Template.instance()._limit;

        var messageList = Mail.find({folder: folderName}, {limit: limit}).fetch();
        console.log(messageList);

        Session.set('msgList' + this.folder, messageList);


        var key = 'folder_' + this.folder + 'show';

        if (Session.get(key)) {
            Session.set(key, false);
        } else {
            Session.set(key, true);
        }

    },
    "submit .new-msg": function (event) {
        var folder = event.target.folder.value;
        var msg = event.target.msg.value;

        console.log("test");

        Meteor.call('addMail', msg, folder, function (error, result) {
            if (error) {
                console.log(error.reason);
            }
            else {
                // Clear form
                event.target.msg.value = "";
                event.target.folder.value = "";
                return false;
            }
        });

        return false;
    },
    "click .removeFolder": function (event) {
        Meteor.call('deleteFolder', {folder: this.folder}, function (error, result) {
            if (error) {
                console.log(error.reason);
            }
            else {
                //TODO Refresh Folder
                return false;
            }
        });
    },
    "submit .renameFolderForm": function (event) {
        var text = event.target.text.value;
        if (text === undefined || text == null || text == "") {
            return false;
        } else {
            Meteor.call('renameFolder', {folder: this.folder}, {$set: {folder: text}}, function (error, result) {
                if (error) {
                    console.log(error.reason);
                }
                else {
                    //TODO Refresh Folder
                    event.target.text.value = "";
                    return true;
                }
            });
            return false;
        }
    },
    "click .moreMessages": function (event) {
        Template.instance()._limit += 5;
        console.log(this.folder + "(_limit MORE): " + Template.instance()._limit);
    },
    "click .lessMessages": function (event) {
        if (Template.instance()._limit > 5) {
            Template.instance()._limit -= 5;
        } else {
            Template.instance()._limit = 5;
        }

        console.log(this.folder + "(_limit LESS): " + Template.instance()._limit);
    }
});

//###############################################################MESSAGE
Template.message.helpers({
    hideMessageDiv: function () {
        var key = 'message_' + this._id + 'show';
        if (Session.get(key)) {
            //console.log("ID(TRUE)= " + this._id);
            return true;
        } else {
            //console.log("ID(FALSE)= " + this._id);
            return false;
        }
    }
});

Template.message.events({
    "click .hideButtonMessage": function (event) {
        //console.log("clicked! " + this._id);

        var mail = Mail.find({_id: this._id}).fetch();
        Session.set("actualMsg" + this._id, mail);

        var key = 'message_' + this._id + 'show';
        if (Session.get(key)) {
            Session.set(key, false);
        } else {
            Session.set(key, true);
        }
    }
});

Template.detail.helpers(
    {
        MessageDetail: function () {
            return Session.get('actualMsg' + this._id);
        },

        "click .removeMessage": function (event) {
            console.log("Remove Message: " + this._id);

            Meteor.call('deleteMail', {_id: this._id}, function (error, result) {
                if (error) {
                    console.log(error.reason);
                }
                else {
                    //TODO Refresh Mail Show
                    return true;
                }
            });
            //Folder.remove(this._id);
        },
        "click .moveMessage": function (event) {
            var text = event.target.text.value;

            console.log(text)
            if (text === undefined || text == null || text == "") {
                return false;
            } else {
                Meteor.call('moveMessage', {_id: this._id}, {$set: {folder: text}}, function (error, result) {
                    if (error) {
                        console.log(error.reason);
                    }
                    else {
                        //TODO Refresh Folder
                        event.target.text.value = "";
                        return false;
                    }
                });
            }

            return false;
        }
    }
);
