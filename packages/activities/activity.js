Activity = {};

Activity.userViewsStory = function () {
    //TODO insert view activity

    //TODO update user.totalViews
};

//TODO user associates problem -> problem, but doesn't vote on this...
// vote: 0 / 1, voteType: regular, star

//NOTE: bigger problem, means associated solutions are larger

/**
 *
 * @param type (regular, star)
 */
Activity.userVotesOnStory = function (type) {
    //TODO insert { type: (vote, star), problem -> solution, or just problem)

    //we track all the variables considered, in case we need to recalculate the algorithm
    //TODO insert vote activity, including current user view / vote ration
    //TODO update user.totalVotes

    //TODO update story.weight
    //if problem - update problem significance, update all solutions significance
    //if solution - update solution significance

};

Activity.userStarsStory = function () {
    //executives can only star problems, they can adopt solutions though
    //TODO?? Are we worried about their view / star ration
    //maybe this is just a type of vote?
};

//how often you vote, significance of the problems & solutions

//todo figure out iterative calculation vs global recalculation