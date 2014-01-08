Activity = {};

Activity.Type = {
    ASSOCIATE: 1,
    CREATE: 2,
    COMMENT: 3,
    FAVORITE: 4,
    MENTION: 5,
    TAG: 6,
    VIEW: 7,
    VOTE: 8
};

Activity.SourceType = {
    ASSOCIATION: 1,
    COMMENT: 2,
    PROBLEM: 3,
    SOLUTION: 4
};

Activity.DestinationType = {
    COMMENT: 1,
    PROBLEM: 2,
    SOLUTION: 3
};

Activity.check = function (activity) {
    check(activity, {
        _id: Match.Any,

        type: Tools.MatchEnum(Activity.Type),

        sourceId: Match.Any,
        sourceType: Match.Where(function (sourceType) {
            return true;

            if (activity.type === Activity.Type.ASSOCIATE) {
                //this would mean they are associating a problem -> solution
                return sourceType === Activity.SourceType.PROBLEM ||
                    //this would mean they are associating a solution -> problem
                    sourceType === Activity.SourceType.SOLUTION;
            }

            if (activity.type === Activity.Type.CREATE) {
                return sourceType === Activity.SourceType.PROBLEM ||
                    sourceType === Activity.SourceType.SOLUTION;
            }

            if (activity.type === Activity.Type.COMMENT) {
                //we might eventually have comments on associations
                return sourceType === Activity.SourceType.COMMENT || //sub-comment
                    sourceType === Activity.SourceType.PROBLEM ||
                    sourceType === Activity.SourceType.SOLUTION;
            }

            if (activity.type === Activity.Type.VIEW) {
                return sourceType === Activity.SourceType.COMMENT ||
                    sourceType === Activity.SourceType.PROBLEM ||
                    sourceType === Activity.SourceType.SOLUTION;
            }

            if (activity.type === Activity.Type.VOTE) {
                //we might eventually be able to vote on comments
                //TODO this. think about what happens if we allow associations and disassociations?
                return sourceType === Activity.SourceType.PROBLEM ||
                    sourceType === Activity.SourceType.ASSOCIATION;
            }

            return false;
        }),

        destinationId: Match.Optional(Match.Any),
        destinationType: Match.Optional(Match.Where(function (destinationType) {
            //right now the destination only applies for associations
            if (activity.type !== Activity.Type.ASSOCIATE) return Tools.IsNullOrUndefined(destinationType);

            //this would mean they are associating a solution -> problem
            return destinationType === Activity.SourceType.PROBLEM ||
                // this would mean they are associating a problem -> solution
                destinationType === Activity.SourceType.SOLUTION;
        })),

        value: Match.Optional(Match.Any)
//        userId: String
    });
};