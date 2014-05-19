function Tuner(sourceNode, destinationNode, audioContext, frequenciesExtractor, InjectedNotesFrequencies) {

    this.sourceNode = sourceNode;
    this.destinationNode = destinationNode;
    this.audioContext = audioContext;
    this.frequenciesExtractor = frequenciesExtractor || new FrequenciesExtractor();
    this.NotesFrequencies = InjectedNotesFrequencies || NotesFrequencies;
    this.count = 0;

    this.start = function(callback) {

        var analyserNode = this.audioContext.createAnalyser();
        analyserNode.fftSize = 2048;
        this.sourceNode.connect(analyserNode);

        var javascriptNode = this.audioContext.createScriptProcessor(8192, 1, 1);
        analyserNode.connect(javascriptNode);

        var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

        var self = this;
        // binding the callback to window to avoid the GC to clean it
        // https://bugzilla.mozilla.org/show_bug.cgi?id=916387
        javascriptNode.onaudioprocess = window.audioProcess = function() {

            analyserNode.getByteFrequencyData(freqByteData);

            var higherValueFrequency = self.frequenciesExtractor.extractHigherValueFrequency(freqByteData, analyserNode.fftSize, self.audioContext.sampleRate);

            var note = self.NotesFrequencies.findNoteByFrequency(higherValueFrequency);

            callback(note);

        }

        javascriptNode.connect(this.destinationNode);
    };

};