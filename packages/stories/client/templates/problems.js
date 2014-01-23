Template.problems.created = function () {
    var addItemModel = new AddItemModel(function () {
        Story.create(Story.Type.PROBLEM, this._text);
    });

    this.__component__.helpers({
        addItemModel: function () {
            return addItemModel;
        }
    });
};

Template.loadMoreProblems.canLoadMore = StoryTools.canLoadMore;

Template.loadMoreProblems.events({
    'click .load-stories-button': StoryTools.loadMore
});

Template.problems.items = function () {
    return Stories.find({ type: Story.Type.PROBLEM });
};