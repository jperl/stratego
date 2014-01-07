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

    api.add_files('templates/general.html', 'client');
    api.add_files('templates/general.js', 'client');

    api.add_files('templates/problems.html', 'client');
    api.add_files('templates/problems.js', 'client');

    api.add_files('templates/solutions.html', 'client');
    api.add_files('templates/solutions.js', 'client');

    api.add_files('templates/story.html', 'client');
    api.add_files('templates/story.js', 'client');

    api.export('Stories');
    api.export('Story');
});