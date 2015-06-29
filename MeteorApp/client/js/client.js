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
    //TODO
    Folder: function () {
        return Session.get('Folder');

    },
    MessageList: function () {
        var list = [
            {_id: "Folder 1"},
            {_id: "MYFolder"},
            {_id: "Rolands Folder"}
        ]
    }
});

Template.folder.helpers({
    hideFolderDiv: function () {
        var key = 'folder_' + this._id + 'show';


        if (Session.get('folder_' + this._id + 'show')) {
            console.log("ID(TRUE)= " + this._id);
            return true;
        } else {
            console.log("ID(FALSE)= " + this._id);
            return false;
        }
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

    "submit .new-msg": function (event) {
        var folder = event.target.folder.value;
        var msg = event.target.msg.value;

        Mail.save({
            folder: folder,
            text: msg
        });

        // Clear form
        event.target.msg.value = "";
        event.target.folder.value = "";

        // Prevent default form submit
        return false;
    }

});


