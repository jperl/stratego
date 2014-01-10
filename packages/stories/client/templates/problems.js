var addNewProblem = function () {
    var titleElement = $('.new-problem-title'), title = titleElement.val();
    if (title.length <= 5) return;

    Stories.insert({ type: Story.Type.PROBLEM, title: title, votesCount: 0 });
    titleElement.val('');
    $('.add-new-problem').animate({opacity: "hide"});
};

Template.newProblem.events({
    'keyup .new-problem-title': _.throttle(function (event) {
        var submitNewProblem = $('.add-new-problem');

        var titleLength = $(event.target).val().length;
        if (titleLength === 0) {
            submitNewProblem.animate({opacity: "hide"});
        }
        else if (titleLength > 5) {
            submitNewProblem.animate({opacity: "show"});
        }
    }, 1000),
    'click .add-new-problem': addNewProblem,
    'keypress .new-problem-title': function (event) {
        if (event.keyCode === 13) addNewProblem();
    }
});

Template.loadMoreProblems.canLoadMore = StoryTools.canLoadMore;
Template.loadMoreProblems.events({
    'click .load-stories-button': StoryTools.loadMore
});

Template.problems.items = function () {
    return Stories.find({ type: Story.Type.PROBLEM });
};