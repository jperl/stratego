Template.header.events({
    'click .nav-links a': function (event) {
        var name = $(event.currentTarget)[0].className + "-page";
        var navElement = $(".nav");
        navElement.removeClass("problems-page");
        navElement.removeClass("solutions-page");
        navElement.addClass(name);
    }
});