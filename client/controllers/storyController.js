StoryController = RouteController.extend({
    before: function () {
        var details = this.params.details;

        var name = "problems"
        if (this.data.page === "solutions-page") {
            name = "solutions";
        }

        if (!details) {
            Router.go('/' + name + '/top');
            this.stop();
            return;
        }

        this.subscribe('stories', details);

        if (details) {
            this.render(name);
            this.stop();
            return;
        }

        this.render('notFound');
        this.stop();
    },
    unload: function () {
        return Template.story.unload();
    }
});