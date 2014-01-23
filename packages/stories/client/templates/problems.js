Template.problems.addItem = function (title) {
    Story.create(Story.Type.PROBLEM, title);
};

Template.loadMoreProblems.canLoadMore = StoryTools.canLoadMore;

Template.loadMoreProblems.events({
    'click .card-btn': StoryTools.loadMore
});

Template.problems.items = function () {
    return Stories.find({ type: Story.Type.PROBLEM });
};