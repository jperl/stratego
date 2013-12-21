Meteor.startup(function () {
    Meteor.publish("stories", function (id) {
        return Stories.find(id);
    });

    Stories.allow({
        insert: function (userId, doc) {
            Story.check(doc);

            return true;
        },
        update: function (userId, doc, fields, modifier) {
            Story.check(doc);

            return true;
        },
        remove: function (userId, doc) {
            return false;
        }
    });
});