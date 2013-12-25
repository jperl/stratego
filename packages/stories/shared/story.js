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

//remove the slash, and anything after it
//ex. DhsjvoA34CRH4739T-fix-the-coffee-machine
Story.getId = function (idParameter) {
    if (!idParameter) return null;
    var slash = idParameter.indexOf('-');
    return idParameter.substring(0, slash != -1 ? idParameter.indexOf('-') : idParameter.length);
};