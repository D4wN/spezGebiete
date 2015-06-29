
Template.body.helpers({
    //TODO
    Folder: function() {
        var list = Meteor.get('folderList');
        console.log(list);

        return  list;
    }
   //
   //Folder:
   //    [{ _id: "This is task 1" },
   //     { _id: "This is task 2" },
   //     { _id: "This is task 3" }
   //     ]
});