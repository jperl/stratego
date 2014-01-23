Template.solutions.addItem = function (title) {
    Story.create(Story.Type.SOLUTION, title);
};

Template.loadMoreSolutions.canLoadMore = StoryTools.canLoadMore;
Template.loadMoreSolutions.events({
    'click .card-btn': StoryTools.loadMore
});

Template.solutions.items = function () {
    return Stories.find({type: Story.Type.SOLUTION});
};