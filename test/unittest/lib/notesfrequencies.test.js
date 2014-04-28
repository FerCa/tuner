suite('NotesFrequencies', function() {


    var testCases = [
        { args: [16], expected: "C0 / C0"},
        { args: [16.4346], expected: "C0 / C0"},
        { args: [51], expected: "G#1/Ab1 / G#1/Ab1"},
        { args: [82], expected: "E2 / E2"},
        { args: [200], expected: "G3 / G#3/Ab3"},
        { args: [740], expected: "F#5/Gb5 / G5"},
        { args: [1760], expected: "A6 / A6"},
        { args: [7902], expected: "B8 / B8"}
    ];

    testCases.forEach(function(testCase) {

        test('findNoteByFrequency when called with frequency ' + testCase.args + ' should return ' + testCase.expected, function() {
            var actual = NotesFrequencies.findNoteByFrequency(testCase.args);

            console.log(actual);
            console.log(testCase.expected);

            chai.assert.equal(actual, testCase.expected);
        });

    });

});