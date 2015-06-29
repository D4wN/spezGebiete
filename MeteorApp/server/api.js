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

        return folder;
    }
    /* MESSAGELIST FRAGMENT
    ,
    messageList: function (folderName) {
        console.log("get message server " + folderName);
        var messageList = Mail.aggregate(
            [
                {$match: {folder: folderName}},
                {$group: {_id: "$_id", _text: {$push: "$text"}, _subject: {$push: "$subject"}}}
            ]);

        console.log(messageList.length);
        return messageList;
    }*/
});

