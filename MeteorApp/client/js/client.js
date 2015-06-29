Template.body.helpers({
    //TODO
    Folder: function () {
        return Session.get('Folder');
    }
});

Template.body.created = function(){
    Meteor.call('folderList', function (error, result) {
        if (error) {
            console.log(error.reason);
        }
        else {
            console.log("data recieved");
            Session.set('Folder', result);
        }
    } );
};