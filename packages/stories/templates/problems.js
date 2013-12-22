Template.problems.events({
    'click .new-problem': function () {
        var id = Stories.insert({ type: Story.Type.PROBLEM });

        Router.go('/problems/' + id);
    }
});

Template.problems.items = function () {
    return ["one", "two", "three"];
};