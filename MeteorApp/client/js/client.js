Template.body.created = function () {
    Meteor.call('folderList', function (error, result) {
        if (error) {
            console.log(error.reason);
        }
        else {
            console.log("data recieved");
            Session.set('Folder', result);
        }
    });
};

Template.body.helpers({
    Folder: function () {
        return Session.get('Folder');
    }
});

Template.folder.helpers({
    hideFolderDiv: function () {
        var key = 'folder_' + this._id + 'show';
        if (Session.get(key)) {
            //console.log("ID(TRUE)= " + this._id);
            return true;
        } else {
            //console.log("ID(FALSE)= " + this._id);
            return false;
        }
    },
    MessageList: function () {
        console.log("ms liste");
        var list = [
            {_id: "m1"},
            {_id: "m2 "},
            {_id: "m3 "}
        ];

        return list;
    }
});

Template.folder.events({
    "click .hideButtonFolder": function (event) {
        //console.log("clicked! " + this._id);

        var key = 'folder_' + this._id + 'show';
        if (Session.get(key)) {
            Session.set(key, false);
        } else {
            Session.set(key, true);
        }
    },
    "click .removeFolder": function (event) {
        console.log("Remove Folder: " + this._id);
        Meteor.call('deleteFolder', function (error, result) {
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

        console.log("Rename " + this._id + " to " + text);

        event.target.text.value = "";
        return false;
    }
});

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