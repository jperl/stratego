Package.describe({
    summary: 'Stories (problems & solutions)'
});

Package.on_use(function (api) {
    api.use('standard-app-packages');
    api.use('underscore');

    api.add_files('shared/collection.js', ['client', 'server']);
    api.add_files('shared/story.js', ['client', 'server']);

    api.add_files('client/storyTemplate.html', 'client');
    api.add_files('client/storyTemplate.js', 'client');

    api.export('Stories');
    api.export('Story');
});