Activities._insertHelper = function (activity) {
    activity.created = new Date();

    if (activity.type === Activity.Type.COMMENT) {
        Stories.update({ _id: activity.problemId || activity.solutionId }, { $inc: { commentsCount: 1 } });
    }
    else if (activity.type === Activity.Type.VOTE) {
        //it is an association, update the stories' associationIds arrays
        if (activity.problemId && activity.solutionId) {
            Stories.update({ _id: activity.problemId }, { $addToSet: { associationIds: activity.solutionId } });
            Stories.update({ _id: activity.solutionId }, { $addToSet: { associationIds: activity.problemId } });
        }
        //if it is a vote on a problem, increase the problem's vote count
        else if (activity.problemId) {
            Stories.update({ _id: activity.problemId }, { $inc: { votesCount: 1 } });
        } else {
            throw 'You cannot vote on a solution';
        }
    }
};

Activities._deleteHelper = function (activity) {
    if (activity.type === Activity.Type.COMMENT) {
        Stories.update({ _id: activity.problemId || activity.solutionId }, { $inc: { commentsCount: -1 } });
    }
};

Activities.allow({
    insert: function (userId, doc) {
        Activity.check(doc);
        Activities._insertHelper(doc);

        return true;
    },
    update: function (userId, doc, fields, modifier) {
        Story.check(doc);

        return true;
    },
    remove: function (userId, doc) {
        Activities._deleteHelper(doc);
        return true;
    }
});

Meteor.methods({
    unvote: function (sourceId, associationId, voteType) {
        var query = {
            type: Activity.Type.VOTE,
            voteType: voteType
        };

        if (voteType === Activity.VoteType.PROBLEM_ON_SOLUTION) {
            query.problemId = associationId;
            query.solutionId = sourceId;
        } else {
            query.problemId = sourceId;

            if (voteType === Activity.VoteType.SOLUTION_ON_PROBLEM) {
                query.solutionId = associationId;
            }
            else if (voteType === Activity.VoteType.PROBLEM) {
                Stories.update({ _id: sourceId }, { $inc: { votesCount: -1 } });
            } else {
                throw 'Vote type not supported: ' + voteType;
            }
        }

        var item = Activities.findOne(query);
        Activities.remove(item._id);
    }
});

Meteor.publish('comments', function (storyId) {
    return Activities.find({
        $or: [
            { problemId: storyId },
            { solutionId: storyId }
        ],
        type: Activity.Type.COMMENT
    });
});

Meteor.publish('votes-count', function (publishId, sourceId, associationId, voteType) {
    var filter = Activity._voteFilter(sourceId, associationId, voteType);

    return Tools.publishCounter({
        id: publishId,
        handle: this,
        name: 'votes-count',
        collection: Activities,
        filter: filter
    });
});