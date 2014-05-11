suite('tuner', function() {

    setup(function() {
        this.fakeSourceNode = {
            connect: function(){}
        };
        this.sourceNodeMock = sinon.mock(this.fakeSourceNode);

        this.fakeDestinationNode = {};
        this.fakeAudioContext = {
            createAnalyser: function() {},
            createScriptProcessor: function() {}
        };

        this.fakeAnalizerNode = {connect: function() {}, getByteFrequencyData: function() {}};
        this.analizerNodeMock = sinon.mock(this.fakeAnalizerNode);

        this.fakeJavascriptNode = {onaudioprocess: function() {}, connect: function() {}};
        sinon.stub(this.fakeAudioContext, "createAnalyser").returns(this.fakeAnalizerNode);
        sinon.stub(this.fakeAudioContext, "createScriptProcessor").returns(this.fakeJavascriptNode);

        this.frequenciesExtractor = new FrequenciesExtractor();
        this.frequenciesExtractorMock = sinon.mock(this.frequenciesExtractor);

        this.fakeNotesFrequencies = {findNoteByFrequency: function() {}};
        this.notesFrequenciesMock = sinon.mock(this.fakeNotesFrequencies);

        this.sut = new Tuner(this.fakeSourceNode, this.fakeDestinationNode, this.fakeAudioContext, this.frequenciesExtractor, this.fakeNotesFrequencies);
    });


    teardown(function() {
        this.sourceNodeMock.restore();
        this.analizerNodeMock.restore();
        this.frequenciesExtractorMock.restore();
        this.notesFrequenciesMock.restore();

    });


    test('start calls sourceNode.connect with correct analyzerNode', function() {
        var expectation = this.sourceNodeMock.expects('connect').once().withArgs(this.fakeAnalizerNode);

        this.sut.start(function(){});

        expectation.verify();
    });


    test('start calls analyzerNode.connect with correct javascriptNode', function() {
        var expectation = this.analizerNodeMock.expects('connect').once().withArgs(this.fakeJavascriptNode);

        this.sut.start(function(){});

        expectation.verify();
    });


    test('javascriptNode.onaudioprocess calls frequenciesExtractor.extractHigherValueFrequency with correct values', function() {
        var freqByteDataValue = new Uint8Array();
        var fftSize = 2048;
        var expectation = this.frequenciesExtractorMock.expects('extractHigherValueFrequency').once().withArgs(freqByteDataValue, fftSize).returns(31);

        this.sut.start(function(){});
        this.fakeJavascriptNode.onaudioprocess();

        expectation.verify();
    });


    test('javascriptNode.onaudioprocess calls NotesFrequencies.findNoteByFrequency with correct values', function() {
        this.frequenciesExtractorMock.expects('extractHigherValueFrequency').returns(31);
        var expectation = this.notesFrequenciesMock.expects('findNoteByFrequency').once().returns('D#0/Eb0');

        this.sut.start(function(){});
        this.fakeJavascriptNode.onaudioprocess();

        expectation.verify();
    });


    test('javascriptNode.onaudioprocess calls provided callback with correct value', function() {
        this.frequenciesExtractorMock.expects('extractHigherValueFrequency').returns(31);
        var expectedNote = 'D#0/Eb0';
        this.notesFrequenciesMock.expects('findNoteByFrequency').returns(expectedNote);

        var actualNote = '';
        var callback = function(note) {
            actualNote = note;
        };

        this.sut.start(callback);
        this.fakeJavascriptNode.onaudioprocess();

        chai.assert.equal(actualNote, expectedNote);
    });


});