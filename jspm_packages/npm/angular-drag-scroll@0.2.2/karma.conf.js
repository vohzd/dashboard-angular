/* */ 
(function(process) {
  module.exports = function(config) {
    var configuration = {
      basePath: '',
      customLaunchers: {Chrome_travis_ci: {
          base: 'Chrome',
          flags: ['--no-sandbox']
        }},
      frameworks: ['jasmine'],
      files: ['node_modules/angular/angular.js', 'node_modules/angular-mocks/angular-mocks.js', 'node_modules/ng-describe/dist/ng-describe.js', 'src/**/*.js', 'test/unit/**/*.spec.js'],
      exclude: [],
      preprocessors: {},
      reporters: ['progress'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: true,
      concurrency: Infinity
    };
    if (process.env.TRAVIS) {
      configuration.browsers = ['Chrome_travis_ci'];
    }
    config.set(configuration);
  };
})(require('process'));
