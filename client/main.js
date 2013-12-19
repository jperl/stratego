//TODO template hash tag formatter

Template.header.title = function () {
    return 'The organization cannot build quality products on time internally <a href="#engineering">#engineering</a> <a href="#product">#product</a>';
};

Template.header.description = function () {
    return 'If we do not improve this, we cannot rely on our internal resources to support the business.';
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