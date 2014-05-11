function FrequenciesExtractor() {

    this.extractHigherValueFrequency = function(frequencyByteData, fourierFastTransformSize, sampleRate) {
        var higherValue = 0;
        var higherValueFrequency = 0;
        var length = frequencyByteData.length;
        // Search for the frequency with the higher value
        for(var x=0; x<length; x++) {

            var frequency = __calculateFrequency(x, sampleRate, fourierFastTransformSize);

            if (frequencyByteData[x] > higherValue) {
                higherValue = frequencyByteData[x];
                higherValueFrequency = frequency;
            }
        }

        return higherValueFrequency;
    };

    function __calculateFrequency(position, sampleRate, fourierFastTransformSize) {
        return position * (sampleRate / (fourierFastTransformSize * 2));
    }

};
