Story = {};

Story.Type = {
    PROBLEM: 1,
    SOLUTION: 2
};

Story.check = function (story) {
    check(story, {
        _id: String,
        description: Match.Optional(String),
        title: Match.Optional(String),
        type: Match.Where(function (type) {
            return type === Story.Type.PROBLEM || type === Story.Type.SOLUTION;
        })
    });
};