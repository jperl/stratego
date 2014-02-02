Package.describe({
    summary: 'Stories (problems & solutions)'
});

Package.on_use(function (api) {
    api.use(['deps', 'session', 'templating', 'underscore'], 'client');

    api.use(['mocks', 'tools', 'activities']);

    api.add_files('shared/collection.js', ['client', 'server']);
    api.add_files('shared/story.js', ['client', 'server']);
    api.add_files('shared/mocks.js', ['client', 'server']);

    api.add_files('server/collection.js', 'server');
    api.add_files('server/publishStories.js', 'server');
    api.add_files('server/searchStories.js', 'server');

    api.add_files('client/templates/storyCard.html', 'client');
    api.add_files('client/templates/storyCard.js', 'client');

    api.add_files('client/templates/searchStories.html', 'client');
    api.add_files('client/templates/searchStories.js', 'client');

    api.add_files('client/templates/problems.html', 'client');
    api.add_files('client/templates/solutions.html', 'client');
    api.add_files('client/templates/storyFeed.js', 'client');

    api.add_files('client/templates/associations.html', 'client');
    api.add_files('client/templates/associations.js', 'client');

    api.export('Stories');
    api.export('Story');

    api.export('StoryFeed', 'client');
});