Package.describe({
    summary: 'Stories (problems & solutions)'
});

Package.on_use(function (api) {
    api.use('templating', 'client');
    api.use('underscore', 'client');

    api.use('mocks');
    api.use('tools');
    api.use('activities');

    api.add_files('shared/collection.js', ['client', 'server']);
    api.add_files('shared/story.js', ['client', 'server']);
    api.add_files('shared/mocks.js', ['client', 'server']);

    api.add_files('server/collection.js', 'server');
    api.add_files('server/publishes.js', 'server');

    api.add_files('client/storyTools.js', 'client');

    api.add_files('client/templates/general.html', 'client');
    api.add_files('client/templates/general.js', 'client');

    api.add_files('client/templates/problems.html', 'client');
    api.add_files('client/templates/problems.js', 'client');

    api.add_files('client/templates/solutions.html', 'client');
    api.add_files('client/templates/solutions.js', 'client');

    api.export('Stories');
    api.export('Story');
    api.export('StoryTools');
});