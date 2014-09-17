module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'browserify'],
    files: [
      'test/*'
    ],
    reporters: ['progress', 'coverage'],
    port: 9876,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: false,
    browserify: {
      watch: true,
      debug: true,
      transform: ['browserify-shim', 'browserify-istanbul']
    },
    preprocessors: {
        'test/*': ['browserify'],
        'lib/*': ['coverage']
    },
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }
  });
};
