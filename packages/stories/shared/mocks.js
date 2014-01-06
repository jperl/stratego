Mocks.stories = [
    {
        title: 'No performance management #engineering #motivation',
        votes: 99,
        comments: [
            { userId: 0, message: "This is a test comment!", date: new Date() },
            { userId: 0, message: "This is another test comment!", date: new Date() }
        ]
    },
    {
        title: 'Lacking transparency #engineering #motivation',
        votes: 50,
        comments: [
            { userId: 0, message: "This is a test comment, this is only a test.", date: new Date() },
            { userId: 0, message: "Hello world.", date: new Date() }
        ]
    },
    {
        title: 'Roof is on fire #safety #workplace #fear',
        votes: 28,
        comments: []
    },
    {
        title: 'No clear way to transfer teams #engineering #motivation',
        votes: 10,
        comments: [
            { userId: 0, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum purus sit amet ornare vulputate. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.", date: new Date() }
        ]
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