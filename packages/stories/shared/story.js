Story = {};

Story.Type = {
    PROBLEM: 1,
    SOLUTION: 2
};

Story.check = function (story) {
    check(story, {
        _id: Match.Any,
        type: Tools.MatchEnum(Story.Type),
        title: Match.Optional(String),
        description: Match.Optional(String),
        associationIds: [Match.Any],
        commentsCount: Number,
        votesCount: Match.Optional(Number)
    });
};

var constructor = function (type, title, description) {
    var options = {
        _id: new Meteor.Collection.ObjectID(),
        type: type,
        title: title,
        associationIds: [],
        commentsCount: 0,
        votesCount: 0
    };
    if (description) options.description = description;

    var story = EJSON.clone(options);
    Story.check(story);
    return story;
};

Story.create = function (type, title, description) {
    var story = constructor(type, title, description);

    if (Meteor.isServer) {
        Stories._insertHelper(story);
    }

    Stories.insert(story);

    return story;
};

Story.remove = function (story) {
    if (Meteor.isServer) {
        Stories._removeHelper(story);
    }

    return Stories.remove(story._id);
};

//remove the slash, and anything after it
//ex. DhsjvoA34CRH4739T-fix-the-coffee-machine
Story.getId = function (idParameter) {
    if (!idParameter) return null;
    var slash = idParameter.indexOf('-');
    return idParameter.substring(0, slash != -1 ? idParameter.indexOf('-') : idParameter.length);
};