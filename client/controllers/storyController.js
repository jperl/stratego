StoryController = RouteController.extend({
    before: function () {
        var details = this.params.details;

        if (!details) {
            Router.go('/problems/top');
            this.stop();
            return;
        }

        this.subscribe('stories', details);

        if (details === "top" || details === "latest" || details === "need-solutions" ||
            details === "my" || details === "discussed") {
            this.render('problems');
            this.stop();
            return;
        }

        this.render('story');
        this.stop();
    },
    unload: function () {
        return Template.story.unload();
    }
});