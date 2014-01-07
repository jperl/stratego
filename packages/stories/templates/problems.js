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
    'click .add-new-problem': function () {
        var title = $('.new-problem-title').val();

        var id = Stories.insert({ type: Story.Type.PROBLEM, title: title, votes: 0 });
    }
});


Template.problems.items = function () {
    return Stories.find({type: Story.Type.PROBLEM});
};