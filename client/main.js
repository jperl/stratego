if (Meteor.isClient) {
    //TODO template hash tag formatter

    Template.header.title = function () {
        return 'We are not hiring great engineers <a href="#recruiting">#recruiting</a> <a href="#engineering">#engineering</a>';
    };

    Template.header.description = function () {
        return 'We are not getting enough of the right people to apply. We need better candidate filtering. We do not have the proper ratios for skillsets.';
    };

    Template.header.rendered = function () {
        //TODO max characters
        var title = new MediumEditor('.title', {
            disableReturn: true,
            disableToolbar: true,
            forcePlainText: true,
            targetBlank: true
        });

        //TODO max characters
        var description = new MediumEditor('.description', {
            disableReturn: true,
            disableToolbar: true,
            forcePlainText: true
        });
    };
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}