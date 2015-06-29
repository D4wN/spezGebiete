Template.body.helpers({
    //TODO
    Folder: function () {
        //Meteor.get('folderList');
        /*var folder = {
         TEST: "TEST WELT",
         list: [
         {_id: "Folder 1"},
         {_id: "MYFolder"},
         {_id: "Rolands Folder"}]
         };*/

        var list = [
            {_id: "Folder 1"},
            {_id: "MYFolder"},
            {_id: "Rolands Folder"}
        ]
        console.log(list);

        return list;
    }
});

Template.folder.helpers({
    hideFolderDiv: function () {
        var key = 'folder_' + this._id + 'show';
        if (Session.get('folder_' + this._id + 'show')) {
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
            {_id: "m 1"},
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
        console.log("Remove Folder " + this._id);
        //Folder.remove(this._id);
    },
    "submit .renameFolderForm": function (event) {
        var text = event.target.text.value;
        if(text === undefined || text == null || text == "")
            return false;

        console.log("Rename " + this._id + " to " + text);

        event.target.text.value = "";
        return false;
    }
});


