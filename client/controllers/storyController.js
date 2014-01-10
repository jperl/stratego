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

        this.subscribe('stories', type, details, 0, pageSize);
        this.subscribe('stories-count', type, details);
        StoryTools.setSubscription(type, details, pageSize);

        if (details) {
            this.render(name);
            this.stop();
            return;
        }

        this.render('notFound');
        this.stop();
    },
    unload: function () {
        StoryTools.unload();
    }
});