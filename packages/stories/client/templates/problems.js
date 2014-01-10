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
    'click .add-new-problem': function (event) {
        var titleElement = $('.new-problem-title'), title = titleElement.val();

        Stories.insert({ type: Story.Type.PROBLEM, title: title, votes: 0 });
        titleElement.val('');
        $('.add-new-problem').animate({opacity: "hide"});
    },
    'keypress .new-problem-title': function (event) {
        var titleElement = $('.new-problem-title'), title = titleElement.val();
        if (event.keyCode === 13 && title.length > 5) {
            Stories.insert({ type: Story.Type.PROBLEM, title: title, votes: 0 });
            titleElement.val('');
            $('.add-new-problem').animate({opacity: "hide"});
        }
    }
});

Template.problems.canLoadMore = function () {
    return StoryTools.canLoadMore();
};

Template.loadMoreProblems.events({
    'click .load-stories-button': function () {
        StoryTools.loadMore();
    }
});

Template.problems.items = function () {
    return Stories.find({ type: Story.Type.PROBLEM });
};