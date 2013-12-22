Package.describe({
    summary: 'Stories (problems & solutions)'
});

Package.on_use(function (api) {
    api.use('templating', 'client');
    api.use('underscore', 'client');

    api.add_files('shared/collection.js', ['client', 'server']);
    api.add_files('shared/story.js', ['client', 'server']);

    api.add_files('templates/problems.html', 'client');
    api.add_files('templates/problems.js', 'client');

    api.add_files('templates/story.html', 'client');
    api.add_files('templates/story.js', 'client');

    api.export('Stories');
    api.export('Story');
});