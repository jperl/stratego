Activity = {};

Activity.Type = {
    COMMENT: 1,
    CREATE: 2,
    DELETE: 3,
    FAVORITE: 4,
//    MENTION: 5,
//    TAG: 6,
//    VIEW: 7,
    VOTE: 8
};

Activity.check = function (activity) {
    check(activity, {
        _id: Match.Any,

        type: Tools.MatchEnum(Activity.Type),

        problemId: Match.Optional(Match.Any),
        solutionId: Match.Optional(Match.Any),

        value: Match.Optional(Match.Any)
//        userId: String
    });
};

var constructor = function (type, value, story, secondStory) {
    var doc = {
        _id: new Meteor.Collection.ObjectID(),
        type: type
    };
    if (value) doc.value = value;

    var activity = EJSON.clone(doc);
    if (story) {
        if (story.type === Story.Type.PROBLEM) activity.problemId = story._id;
        else activity.solutionId = story._id;
    }

    if (secondStory) {
        if (secondStory.type === Story.Type.PROBLEM) activity.problemId = secondStory._id;
        else activity.solutionId = secondStory._id;
    }

    Activity.check(activity);

    return activity;
};

Activity.create = function (story) {
    var activity = constructor(Activity.Type.CREATE, null, story);

    Activities.insert(activity);
};

Activity.comment = function (content, story) {
    var activity = constructor(Activity.Type.COMMENT, content, story);

    if (Meteor.isServer) {
        Activities._insertHelper(activity);
    }

    Activities.insert(activity);

    return activity;
};

Activity.vote = function (sourceStory, associatedStory) {
    var activity = constructor(Activity.Type.VOTE, 1, sourceStory, associatedStory);

    if (Meteor.isServer) {
        Activities._insertHelper(activity);
    }

    Activities.insert(activity);

    return activity;
};