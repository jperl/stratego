Package.describe({
    summary: 'Add this package if you would like to populate the database with mocks'
});

Package.on_use(function (api) {
    api.use('underscore', 'server');
    api.use('mocks', 'server');

    api.add_files('populateDatabase.js', 'server');
});