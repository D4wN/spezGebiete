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

        Meteor.call("findFolder", function (error, result) {
            if (error) {
                console.log(error.reason);
            }
            else {
                Session.set('Folder', result);
            }
        });

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
        var msg = Session.get("msgList");
        return msg;
    }
});

Template.folder.events({
    "click .hideButtonFolder": function (event) {
        console.log("clicked! " + this.folder);

        Session.set('msgList', [{subject: 'loading'}]);
        var limitValue = Template.instance()._limit;

        Meteor.call("getMail", {folder: this.folder}, {limit: limitValue}, function (error, result) {
            if (error) {
                console.log(error.reason);
            }
            else {
                console.log("results ");
                console.log(result);
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
        Meteor.call('deleteFolder', {folder: this.folder}, function (error, result) {
            if (error) {
                console.log(error.reason);
            }
            else {
                //TODO Refresh Folder
            }
        });
    },
    "submit .renameFolderForm": function (event) {
        var text = event.target.text.value;
        if (text === undefined || text == null || text == ""){
            Meteor.call('renameFolder', {folder: this.folder}, {folder: text}, function (error, result) {
                if (error) {
                    console.log(error.reason);
                }
                else {
                    //TODO Refresh Folder
                    event.target.text.value = "";
                }
            });
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

        Meteor.call('findingMail', {_id: this._id}, function (error, result) {
            if (error) {
                console.log(error.reason);
            }
            else {
                console.log("Find succes");
                Session.set("actualMsg", result);
            }
        });

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
    },

    "click .moveMessage": function (event) {
        var text = event.target.text.value;
        if (text === undefined || text == null || text == "")

            Meteor.call('moveMessage', {_id: this._id}, {folder: text}, function (error, result) {
                if (error) {
                    console.log(error.reason);
                }
                else {
                    //TODO Refresh Folder
                    event.target.text.value = "";
                }
            });

        return false;
    }
});

Template.detail.helpers(
    {
        MessageDetail: function () {
            return Session.get('actualMsg');//{_id: "Detail", text: "Hallo Detail Welt, Du bist so schön!"};
        }
    }
);
