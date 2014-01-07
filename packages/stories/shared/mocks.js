Mocks.stories = [
    {
        type: Story.Type.PROBLEM,
        title: 'No engineering performance management.',
        votes: 99,
        comments: [
            { userId: 0, message: 'Who cares??', date: new Date() }
        ]
    },
    {
        type: Story.Type.SOLUTION,
        title: 'Have monthly manager / employee performance reviews.',
        votes: 5,
        comments: [
            { userId: 0, message: 'Can\'t believe we are not doing this yet.', date: new Date() },
        ]
    },
    {
        type: Story.Type.PROBLEM,
        title: 'Lacking transparency.',
        description: 'It would be nice if we could get more transparency from top to bottom throughout the company. #engineering #motivation',
        votes: 50,
        comments: [
            { userId: 0, message: 'This is a test comment, this is only a test.', date: new Date() },
            { userId: 0, message: 'Hello world.', date: new Date() }
        ]
    },
    {
        type: Story.Type.SOLUTION,
        title: 'Create email list archives that are internally accessible.',
        votes: 5,
        comments: [
            { userId: 0, message: 'Stripe and Khan Academy do it.', date: new Date() },
            { userId: 0, message: 'Yeah but not sure this will fly here.', date: new Date() }
        ]
    },
    {
        type: Story.Type.PROBLEM,
        title: 'Roof is on fire.',
        description: '#safety #workplace #fear',
        votes: 28,
        comments: [
            { userId: 0, message: 'Where?!?!', date: new Date() }
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