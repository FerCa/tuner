tuner.js
=====

Chromatic Tunner javascript library for the Web Audio API

tunner.js is a javascript library providing a Chromatic Tuner that you can connect to a Web Audio Api Source and 
also to a destination, acting as a node and calling the provided callback with the detected note.

Simple example:

var tuner = new Tuner(aSource, aDestination, aValidAudioContext);

tuner.start(function(note) {
  console.log(note); // The detected note.
});

See example.html for a full example.
