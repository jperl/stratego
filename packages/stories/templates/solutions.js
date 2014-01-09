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
    'click .add-new-solution': function () {
        var title = $('.new-solution-title').val();

        Stories.insert({ type: Story.Type.SOLUTION, title: title, votes: 0 });
    }
});

Template.loadMoreSolutions.events({
    'click .load-stories-button': function () {
        StoryTools.loadMore();
    }
});

Template.solutions.items = function () {
    return Stories.find({type: Story.Type.SOLUTION});
};