Template.storyHeader.rendered = function () {
    new MediumEditor('.title', {
        disableReturn: true,
        disableToolbar: true,
        forcePlainText: true,
        targetBlank: true
    });

    new MediumEditor('.description', {
        disableReturn: true,
        disableToolbar: true,
        forcePlainText: true
    });
};

//TODO debounce title / description save... Max characters title
//Template.storyHeader.events({
//    'keyup .title': _.debounce(function (event) {
//        console.log(this);
//        Stories.update(this._id, {
//            $set: { title: $(event.target).text() }
//        });
//    }, 250)
//});

//TODO template hash tag formatter