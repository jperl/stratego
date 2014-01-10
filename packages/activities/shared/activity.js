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

Activity.create = function (options, story) {
    var activity = EJSON.clone(options);

    if (!activity._id) activity._id = new Meteor.Collection.ObjectID();

    if (story) {
        if (story.type === Story.Type.PROBLEM) activity.problemId = story._id;
        else activity.solutionId = story._id;
    }

    Activity.check(activity);

    return activity;
};