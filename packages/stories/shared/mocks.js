Mocks.stories = [
    {
        type: Story.Type.PROBLEM,
        title: 'No engineering performance management.'
    },
    {
        type: Story.Type.SOLUTION,
        title: 'Have monthly manager / employee performance reviews.'
    },
    {
        type: Story.Type.PROBLEM,
        title: 'Lacking transparency.',
        description: 'It would be nice if we could get more transparency from top to bottom throughout the company. #engineering #motivation'
    },
    {
        type: Story.Type.SOLUTION,
        title: 'Create email list archives that are internally accessible.'
    },
    {
        type: Story.Type.PROBLEM,
        title: 'Roof is on fire.',
        description: '#safety #workplace #fear'
    }
];

if (Meteor.isServer) {
    Mocks.populate(function () {
        if (Stories.find().count() > 0) return;

        _.each(Mocks.stories, function (story) {
            var story = Story.create(story.type, story.title, story.description);

            //add a few comments
            for (var i = 0; i < Tools.getRandomInt(0, 4); i++) {
                Activity.comment(Tools.getRandomItem(Mocks.comments), story);
            }

            //add a few votes
            if (story.type === Story.Type.PROBLEM) {
                for (var v = 0; v < Tools.getRandomInt(0, 10); v++) {
                    Activity.vote(story);
                }
            }
        });
    });
}