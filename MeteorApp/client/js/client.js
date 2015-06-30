Template.body.created = function () {
    /* Meteor.call('folderList', function (error, result) {
     if (error) {
     console.log(error.reason);
     }
     else {
     console.log("data recieved");
     Session.set('Folder', result);
     }
     });*/
};

Template.body.helpers({
    Folder: function () {
        //return Session.get('Folder');
        var folderList = _.uniq(Mail.find().fetch(), false, function (mails) {
            return mails.folder
        });

        Session.set('Folder', folderList);

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
        return Session.get("msgList");
    }
});

Template.folder.events({
    "click .hideButtonFolder": function (event) {
        console.log("clicked! " + this.folder);

        Session.set('msgList', [{subject: 'loading'}]);

        //TODO MSGLIST
        Meteor.call("getMail", {folder: this.folder}, function (error, result) {
            if (error) {
                console.log(error.reason);
            }
            else {
                Session.set('msgList', result);
            }
        });

        //var folderName = this.folder;

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


        Method.call('addMessage', msg, folder);

        // Clear form
        event.target.msg.value = "";
        event.target.folder.value = "";

        // Prevent default form submit
        return false;
    },
    "click .removeFolder": function (event) {
        console.log("Remove Folder: " + this.folder);

        Meteor.call('deleteFolder', this.folder, function (error, result) {
            if (error) {
                console.log(error.reason);
            }
            else {
                console.log("Delete Success");
            }
        });
    },
    "submit .renameFolderForm": function (event) {
        var text = event.target.text.value;
        if (text === undefined || text == null || text == "")
            return false;

        event.target.text.value = "";
        return false;
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
    },
    MessageDetail: function () {
        return {_id: "Detail", text: "Hallo Detail Welt, Du bist so schön!"};
    }
});

Template.message.events({
    "click .hideButtonMessage": function (event) {
        //console.log("clicked! " + this._id);

        var key = 'message_' + this._id + 'show';
        if (Session.get(key)) {
            Session.set(key, false);
        } else {
            Session.set(key, true);
        }
    },
    "click .removeMessage": function (event) {
        console.log("Remove Message: " + this._id);
        //Folder.remove(this._id);
    }
});
