Mocks.stories = [
    {
        type: 1,
        title: 'No performance management.',
        votes: 99,
        comments: [
            { userId: 0, message: "This is a test comment!", date: new Date() },
            { userId: 0, message: "This is another test comment!", date: new Date() }
        ]
    },
    {
        type: 1,
        title: 'Lacking transparency.',
        description: 'It would be nice if we could get more transparency from top to bottom throughout the company. #engineering #motivation',
        votes: 50,
        comments: [
            { userId: 0, message: "This is a test comment, this is only a test.", date: new Date() },
            { userId: 0, message: "Hello world.", date: new Date() }
        ]
    },
    {
        type: 1,
        title: 'Roof is on fire.',
        description: '#safety #workplace #fear',
        votes: 28,
        comments: []
    },
    {
        type: 1,
        title: 'No clear way to transfer teams.',
        votes: 10,
        comments: [
            { userId: 0, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum purus sit amet ornare vulputate. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.", date: new Date() }
        ]
    },
    {
        type: 2,
        title: 'Lacking transparency.',
        description: 'It would be nice if we could get more transparency from top to bottom throughout the company. #engineering #motivation',
        votes: 50,
        comments: [
            { userId: 0, message: "This is a test comment, this is only a test.", date: new Date() },
            { userId: 0, message: "Hello world.", date: new Date() }
        ]
    },
    {
        type: 2,
        title: 'Roof is on fire.',
        description: '#safety #workplace #fear',
        votes: 28,
        comments: []
    },
    {
        type: 2,
        title: 'No clear way to transfer teams.',
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