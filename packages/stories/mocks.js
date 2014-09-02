Mocks.problems = [
    {
        title: 'Not recruiting best engineers.',
        solutions: [0, 1, 2]
    },
    {
        title: 'Lacking transparency.',
        description: 'It would be nice if we could get more transparency from top to bottom throughout the company. #engineering #motivation',
        solutions: [3, 4, 5]
    }
];

Mocks.solutions = [
    {
        title: 'Local engineering PR push.'
    },
    {
        title: 'Manager StackOverflow campaign.',
        description: 'Incentive managers for seeking out quality talent on StackOverflow.'
    },
    {
        title: 'LinkedIn messaging campaign.',
        description: 'Send out personalized messages to identified talent on LinkedIn.'
    },
    {
        title: 'Have cross-functional teams, and function team meetings.'
    },
    {
        title: 'Change engineering meeting from announcement based, to a town hall format.'
    },
    {
        title: 'Create email list archives that are internally accessible.'
    }
];

if (Meteor.isServer) {
    Mocks.populate(function () {
        if (Stories.find().count() > 0) return;

        var solutions = [];
        _.each(Mocks.solutions, function (mockSolution) {
            var solution = Story.create(Story.Type.SOLUTION, mockSolution.title, mockSolution.description);

            //add a few comments
            Tools.randomTimes(0, 4, function (comment) {
                Activity.comment(comment, solution);
            }, Mocks.comments);

            solutions.push(solution);
        });

        _.each(Mocks.problems, function (mockProblem) {
            var problem = Story.create(Story.Type.PROBLEM, mockProblem.title, mockProblem.description);

            //add a few comments
            Tools.randomTimes(0, 4, function (comment) {
                Activity.comment(comment, problem);
            }, Mocks.comments);

            //add a few votes to the problems
            Tools.randomTimes(0, 10, function () {
                Activity.vote(problem);
            });

            //setup the associations
            if (mockProblem.solutions) {
                for (var s = 0; s < mockProblem.solutions.length; s++) {
                    var solutionIndex = mockProblem.solutions[s];
                    Activity.vote(problem, solutions[solutionIndex]);
                }
            }
        });
    });
}