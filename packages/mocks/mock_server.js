var populateFunctions = [];

/**
* Add a function that will be run when populating mock data
*/
Mocks.populate = function (populateFunction) {
    populateFunctions.push(populateFunction);
};

Mocks.populateData = function () {
    _.each(populateFunctions, function (populateFunction) {
        populateFunction();
    });
};