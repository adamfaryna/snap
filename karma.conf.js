'use strict';

module.exports = function(config){
  config.set({
    basePath : './',
    singleRun: false,

    files : [
      'app/**/*.js',
      'test/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    //browsers : ['PhantomJS'],
    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
