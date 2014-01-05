Mocks.stories = [
    {
        title: 'No performance management #engineering #motivation'
    },
    {
        title: 'Lacking transparency #engineering #motivation'
    },
    {
        title: 'Roof is on fire #safety #workplace #fear'
    },
    {
        title: 'No clear way to transfer teams #engineering #motivation'
    }
];

if (Meteor.isServer) {
    Mocks.populate(function () {
        if (Stories.find().count() > 0) return;

        _.each(Mocks.stories, function (story) {
            Stories.insert(story);
        });
    });
}