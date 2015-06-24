Meteor.startup(function () {

    console.log(Mail.findOne())

});





Meteor.publish('mail', function () {
    return Mail.find();
});
