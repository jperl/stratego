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
            Stories._insertHelper(story);
            Stories.insert(story);

            //add a few comments
            for (var i = 0; i < Tools.getRandomInt(0, 4); i++) {
                var comment = Activity.create(Tools.getRandomItem(Mocks.comments), story);
                Activities._insertHelper(comment);
                Activities.insert(comment);
            }

            //add a few votes
            if (story.type === Story.Type.PROBLEM) {
                for (var v = 0; v < Tools.getRandomInt(0, 10); v++) {
                    var vote = Activity.create({
                        type: Activity.Type.VOTE,
                        value: 1
                    }, story);

                    Activities._insertHelper(vote);

                    Activities.insert(vote);
                }
            }
        });
    });
}