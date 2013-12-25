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
    }, 2500),
    'click .add-new-problem': function () {
        var title = $('.new-problem-title').val();

        var id = Stories.insert({ type: Story.Type.PROBLEM, title: title });
        Router.go('/problems/' + id);
    }
});

Template.problems.items = function () {
    return Stories.find();
};