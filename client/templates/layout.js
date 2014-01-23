Template.header.events({
    'click .nav-links a': function (event) {
        var name = $(event.currentTarget)[0].className + "-page";

        // TODO: Change this to force re-render?
        $(".nav")
            .removeClass("problems-page")
            .removeClass("solutions-page")
            .addClass(name);

        $(".content-container")
            .removeClass("problems-page")
            .removeClass("solutions-page")
            .addClass(name);
    }
});