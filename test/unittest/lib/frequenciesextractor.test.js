suite('FrequenciesExtractor', function() {

    setup(function() {
        this.sut = new FrequenciesExtractor();
    });

    function arrayToUint8Array(arr) {
        var arrayBuffer = new ArrayBuffer(arr.length);
        var uint8Array = new Uint8Array(arrayBuffer);
        var arrLength = arr.length;
        for (var i = 0; i < arrLength; i++) {
            uint8Array[i] = arr[i];
        }
        return uint8Array;
    }

    // Real values here should be 1024 positions Uint8Arrays, the value of this test basically to know if the behaviour of the method changes.
    var testCases = [
        { args: [arrayToUint8Array([2, 45, 32, 12, 67, 34, 80, 101, 2, 453, 89, 77, 102, 32, 1, 65]), 2048, 44100], expected: 96.8994140625},
        { args: [arrayToUint8Array([20, 34, 92, 32, 7, 3, 21, 54, 9, 4, 1, 43, 78, 82, 96, 12, 90]), 2048, 44100], expected: 150.732421875},
        { args: [arrayToUint8Array([3, 6, 1, 8, 3, 6, 54, 87, 112, 113, 117, 65, 45, 89, 32, 13, 78]), 2048, 44100], expected: 107.666015625}
    ];

    testCases.forEach(function(testCase) {

        test('extractHigherValueFrequency when called with values ' + testCase.args + ' should return ' + testCase.expected, function() {
            var actual = this.sut.extractHigherValueFrequency.apply(this, testCase.args)

            chai.assert.equal(actual, testCase.expected);
        });

    });

});