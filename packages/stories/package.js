Package.describe({
    summary: 'Stories (problems & solutions)'
});

Package.on_use(function (api) {
    api.use(['deps', 'session', 'templating', 'underscore'], 'client');

    api.use(['mocks', 'tools', 'activities']);

    api.addFiles([
        'stories.js',
        'story.js',
        'mocks.js'
    ], ['client', 'server']);

    api.addFiles([
        'stories_server.js',
        'stories_search_server.js'
    ], 'server');

    api.addFiles([
        'templates/story_card.html', 'templates/story_card.js',
        'templates/search_stories.html', 'templates/search_stories.js',
        'templates/problems.html',
        'templates/solutions.html',
        'templates/story_feed.js',
        'templates/associations.html', 'templates/associations.js'
    ], 'client');

    api.export(['Stories', 'Story', 'StoryFeed'], ['client', 'server']);
});