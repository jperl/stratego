var addNewSolution = function () {
    var titleElement = $('.new-solution-title'), title = titleElement.val();
    if (title.length <= 5) return;

    Stories.insert({ type: Story.Type.SOLUTION, title: title, votes: 0 });
    titleElement.val('');
    $('.add-new-solution').animate({opacity: "hide"});
};

Template.newSolution.events({
    'keyup .new-solution-title': _.throttle(function (event) {
        var submitSolution = $('.add-new-solution');

        var titleLength = $(event.target).val().length;
        if (titleLength === 0) {
            submitSolution.animate({opacity: "hide"});
        }
        else if (titleLength > 5) {
            submitSolution.animate({opacity: "show"});
        }
    }, 1000),
    'click .add-new-solution': addNewSolution,
    'keypress .new-solution-title': function (event) {
        if (event.keyCode === 13) addNewSolution();
    }
});

Template.loadMoreSolutions.canLoadMore = StoryTools.canLoadMore;
Template.loadMoreSolutions.events({
    'click .load-stories-button': StoryTools.loadMore
});

Template.solutions.items = function () {
    return Stories.find({type: Story.Type.SOLUTION});
};