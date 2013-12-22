//remove the slash, and anything after it
//ex. DhsjvoA34CRH4739T-fix-the-coffee-machine
var getId = function (idParameter) {
    if (!idParameter) return null;
    var slash = idParameter.indexOf('-');
    return idParameter.substring(0, slash != -1 ? idParameter.indexOf('-') : idParameter.length);
};

StoryController = RouteController.extend({
    before: function () {
        var details = this.params.details;

        if (!details) {
            Router.go('/problems/top');
            this.stop();
            return;
        }

        if (details === "top" || details === "latest" || details === "need-solutions" ||
            details === "my" || details === "discussed") {
            this.render('problems');
            this.stop();
            return;
        }

        //show the specific story
        var storyId = getId(details);
        this.params._id = storyId;
        this.subscribe('stories', storyId);

        this.render('story');
        this.stop();
    },
    unload: function () {
        return Template.story.unload();
    }
});