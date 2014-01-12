Activities._insertHelper = function (activity) {
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
        return false;
    }
});
