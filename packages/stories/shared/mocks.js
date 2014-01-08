Mocks.stories = [
    {
        type: Story.Type.PROBLEM,
        title: 'No engineering performance management.',
        votes: 99
    },
    {
        type: Story.Type.SOLUTION,
        title: 'Have monthly manager / employee performance reviews.',
        votes: 5
    },
    {
        type: Story.Type.PROBLEM,
        title: 'Lacking transparency.',
        description: 'It would be nice if we could get more transparency from top to bottom throughout the company. #engineering #motivation',
        votes: 50
    },
    {
        type: Story.Type.SOLUTION,
        title: 'Create email list archives that are internally accessible.',
        votes: 5
    },
    {
        type: Story.Type.PROBLEM,
        title: 'Roof is on fire.',
        description: '#safety #workplace #fear',
        votes: 28
    }
];

if (Meteor.isServer) {
    Mocks.populate(function () {
        if (Stories.find().count() > 0) return;

        _.each(Mocks.stories, function (story) {
            Stories._insertHelper(story);
            Stories.insert(story);
        });
    });
}