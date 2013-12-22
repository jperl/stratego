//remove the slash, and anything after it
//ex. DhsjvoA34CRH4739T-fix-the-coffee-machine
var getId = function (idParameter) {
    if (!idParameter) return null;
    var slash = idParameter.indexOf('-');
    return idParameter.substring(0, slash != -1 ? idParameter.indexOf('-') : idParameter.length);
};

StoryController = RouteController.extend({
    before: function () {
        //show the specific story
        var storyId = getId(this.params.param);
        if (storyId) {
            this.params._id = storyId;
            this.subscribe('stories', storyId);
        }
    },
    unload: function () {
        return Template.story.unload();
    }
});