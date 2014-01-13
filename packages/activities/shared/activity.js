Activity = {};

Activity.Type = {
    ADD: 1,
    COMMENT: 2,
    REMOVE: 3,
    FAVORITE: 4,
//    MENTION: 5,
//    TAG: 6,
//    VIEW: 7,
    VOTE: 8
};

Activity.VoteType = {
    PROBLEM: 1,
    PROBLEM_ON_SOLUTION: 2,
    SOLUTION_ON_PROBLEM: 3
};

Activity.check = function (activity) {
    check(activity, {
        _id: Match.Any,

        type: Tools.MatchEnum(Activity.Type),
        voteType: Match.Optional(Tools.MatchEnum(Activity.VoteType)),

        problemId: Match.Optional(Match.Any),
        solutionId: Match.Optional(Match.Any),

        value: Match.Optional(Match.Any)
//        userId: String
    });
};

Activity.getVoteType = function (sourceStory, isAssociatedStory) {
    if (sourceStory && isAssociatedStory) {
        return sourceStory.type === Story.Type.PROBLEM ?
            Activity.VoteType.SOLUTION_ON_PROBLEM : Activity.VoteType.PROBLEM_ON_SOLUTION;
    } else if (sourceStory) {
        if (sourceStory.type === Story.Type.PROBLEM) return Activity.VoteType.PROBLEM;

        throw 'If you are not voting on an association, you can only vote on a problem';
    }

    throw 'Cannot vote on an associated story without a source story';
};

var constructor = function (type, value, sourceStory, associatedStory) {
    var options = {
        _id: new Meteor.Collection.ObjectID(),
        type: type
    };
    if (value) options.value = value;

    var activity = EJSON.clone(options);
    if (sourceStory) {
        if (sourceStory.type === Story.Type.PROBLEM) activity.problemId = sourceStory._id;
        else activity.solutionId = sourceStory._id;
    }

    if (associatedStory) {
        if (associatedStory.type === Story.Type.PROBLEM) activity.problemId = associatedStory._id;
        else activity.solutionId = associatedStory._id;
    }

    //setup the vote type
    if (type === Activity.Type.VOTE) {
        activity.voteType = Activity.getVoteType(sourceStory, associatedStory);
    }

    Activity.check(activity);

    return activity;
};

Activity.add = function (story) {
    var activity = constructor(Activity.Type.ADD, null, story);

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

Activity.remove = function (source) {
    if (source.associationIds) {
        //it is a story, create a remove activity
        var activity = constructor(Activity.Type.REMOVE, source, source);
        Activities.insert(activity);
    } else {
        Activities.remove(source._id);
    }
};

Activity.vote = function (sourceStory, associatedStory) {
    var activity = constructor(Activity.Type.VOTE, 1, sourceStory, associatedStory);

    if (Meteor.isServer) {
        Activities._insertHelper(activity);
    }

    Activities.insert(activity);

    return activity;
};

Activity.unvote = function (sourceStory, associatedStory) {
    var associatedStoryId = associatedStory ? associatedStory._id : null;
    Meteor.call('unvote', sourceStory._id, associatedStoryId, Activity.getVoteType(sourceStory, associatedStory));
};

Activity._voteFilter = function (sourceId, associationId, voteType) {
    var filter = {
        type: Activity.Type.VOTE,
        voteType: voteType
    };

    if (voteType === Activity.VoteType.PROBLEM_ON_SOLUTION) {
        filter.problemId = associationId;
        filter.solutionId = sourceId;
    } else if (voteType === Activity.VoteType.SOLUTION_ON_PROBLEM) {
        filter.problemId = sourceId;
        filter.solutionId = associationId;
    } else {
        throw 'Vote type not supported';
    }

    return filter;
};