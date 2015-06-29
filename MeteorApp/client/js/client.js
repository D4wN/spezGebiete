if (Meteor.isClient) {
    console.log("CLIENT");

    Template.body.helpers({
        //TODO
        Folder: function () {
            //Meteor.get('folderList');
            var list = [
                {_id: "Folder 1"},
                {_id: "MYFolder"},
                {_id: "Rolands Folder"}
            ]
            console.log(list);

            return list;
        },
        MessageList: function(){
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
        }
    });

} else {
    //Server
    console.log("SERVER");
}



