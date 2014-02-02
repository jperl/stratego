var pageSize = 5;

StoryController = RouteController.extend({
    before: function () {
        var details = this.params.details;

        var name = 'problems';
        if (this.data.page === 'solutions-page') {
            name = 'solutions';
        }

        if (!details) {
            Router.go('/' + name + '/top');
            this.stop();
            return;
        }

        var type = name === 'problems' ? Story.Type.PROBLEM : Story.Type.SOLUTION;

        this.subscribe('stories', type, details, { limit: pageSize });
        this.subscribe('stories-count', type, details);
        StoryFeed.subscribedTo(details, pageSize);

        if (details) {
            this.render(name);
            this.stop();
            return;
        }

        this.render('notFound');
        this.stop();
    },
    unload: StoryFeed.unload
});