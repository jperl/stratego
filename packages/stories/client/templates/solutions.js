Template.solutions.addItem = function (title) {
    Story.create(Story.Type.SOLUTION, title);
};

Template.loadMoreSolutions.canLoadMore = StoryTools.canLoadMore;
Template.loadMoreSolutions.events({
    'click .load-stories-button': StoryTools.loadMore
});

Template.solutions.items = function () {
    return Stories.find({type: Story.Type.SOLUTION});
};