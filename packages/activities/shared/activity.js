Activity = {};

Activity.Type = {
    //TODO hashtags?? or is that an association. also associating to a user / other entities??
    ASSOCIATION: 1,
    COMMENT: 1,
    VIEW: 2,
    //TODO??
    VOTE: 3
};

Activity.SourceType = {
    ASSOCIATION: 1,
    COMMENT: 2,
    PROBLEM_STORY: 3,
    SOLUTION_STORY: 4
};

Activity.DestinationType = {
    COMMENT: 1,
    PROBLEM_STORY: 2,
    SOLUTION_STORY: 3
};

Activity.check = function (activity) {
    check(activity, {
        _id: String,

        sourceId: String,
        sourceType: Match.Where(function (sourceType) {
            if (activity.type === Activity.Type.ASSOCIATION) {
                //this would mean they are associating a problem -> solution
                return sourceType === Activity.SourceType.PROBLEM_STORY ||
                    //this would mean they are associating a solution -> problem
                    sourceType === Activity.SourceType.SOLUTION_STORY;
            }

            if (activity.type === Activity.Type.COMMENT) {
                //we might eventually have comments on associations
                return sourceType === Activity.SourceType.COMMENT || //sub-comment
                    sourceType === Activity.SourceType.PROBLEM_STORY ||
                    sourceType === Activity.SourceType.SOLUTION_STORY;
            }

            if (activity.type === Activity.Type.VIEW) {
                return sourceType === Activity.SourceType.COMMENT ||
                    sourceType === Activity.SourceType.PROBLEM_STORY ||
                    sourceType === Activity.SourceType.SOLUTION_STORY;
            }

            if (activity.type === Activity.Type.VOTE) {
                //TODO this. think about what happens if we allow associations and disassociations?
                //return sourceType === Activity.SourceType.PROBLEM_STORY ||
                //sourceType === Activity.SourceType.ASSOCIATION;
            }

            return false;
        }),

        destinationId: Match.Optional(String),
        destinationType: Match.Where(function (destinationType) {
            //right now the destination only applies for associations TODO or votes??
            if (activity.type !== Activity.Type.ASSOCIATION) return Tools.IsNullOrUndefined(destinationType);

            //this would mean they are associating a solution -> problem
            return destinationType === Activity.SourceType.PROBLEM_STORY ||
                // this would mean they are associating a problem -> solution
                destinationType === Activity.SourceType.SOLUTION_STORY;
        }),

        type: Tools.MatchEnum(Activity.Type),

        //TODO votes go here, comment content goes here??
        value: [String, Number],
        userId: String
    });
};