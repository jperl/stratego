Template.solutions.created = function () {
    var addItemModel = new AddItemModel(function () {
        Story.create(Story.Type.SOLUTION, this._text);
    });

    this.__component__.helpers({
        addItemModel: function () {
            return addItemModel;
        }
    });
};

Template.loadMoreSolutions.canLoadMore = StoryTools.canLoadMore;
Template.loadMoreSolutions.events({
    'click .card-btn': StoryTools.loadMore
});

Template.solutions.items = function () {
    return Stories.find({type: Story.Type.SOLUTION});
};