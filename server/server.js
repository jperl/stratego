Meteor.startup(function () {
    Meteor.publish("stories", function (id) {
        return Stories.find(id);
    });

    Stories.allow({
        insert: function (userId, doc) {
//            doc.userId = userId;

            return doc.check();
        },
        update: function (userId, doc, fields, modifier) {
            return doc.check();
        },
        remove: function (userId, doc) {
            return false;
        }
    });
});