Template.list.events({
    'click .new-problem': function () {
        var id = Stories.insert(new Story({ type: Story.Type.PROBLEM }));

        Router.go('/problem/' + id);
    },

    'click .new-solution': function () {
        var id = Stories.insert(new Story({ type: Story.Type.SOLUTION }));

        Router.go('/solution/' + id);
    }
});