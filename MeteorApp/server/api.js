Meteor.startup(function () {

    //console.log(Mail.findOne())


});

Meteor.methods({
    /*
     * FolderList
     *
     * */
    folderList: function () {
        var mails = Mail.find().fetch();

        var groupedFolder = _.groupBy(_.pluck(mails, 'folder'));

        var folderList = _.map(_.values(groupedFolder), function(folder) {
            //console.log({Folder: folder[0], Total: folder.length});
            return {_id: folder[0]}
        });

        console.log(folderList);

        return folderList
    }
});

