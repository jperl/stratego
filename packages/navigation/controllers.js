var pageSize = 5;

StoryController = RouteController.extend({
    onBeforeAction: function (pause) {
        var details = this.params.details;

        var name = 'problems';
        if (this.data.page === 'solutions-page') {
            name = 'solutions';
        }

        if (!details) {
            Router.go('/' + name + '/top');
            pause();
            return;
        }

        var type = name === 'problems' ? Story.Type.PROBLEM : Story.Type.SOLUTION;

        this.subscribe('stories', type, details, { limit: pageSize });
        this.subscribe('stories-count', type, details);
        StoryFeed.subscribedTo(details, pageSize);

        if (details) {
            this.render(name);
            pause();
            return;
        }

        this.render('notFound');
        pause();
    },
    onStop: StoryFeed.stop
});