Meteor.startup(function () {

    //console.log(Mail.findOne())


});


Meteor.methods({
    /*
     * FolderList
     *
     * */
    folderList: function () {
        var folder = Mail.aggregate(
            [
                {$group: {_id: "$folder"}}
            ]);
        console.log(folder);
        console.log("bla")
        return folder
    }
});

