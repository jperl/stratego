Template.problems.events({
    'click .new-problem': function () {
        var id = Stories.insert({ type: Story.Type.PROBLEM });

        Router.go('/problems/' + id);
    }
});