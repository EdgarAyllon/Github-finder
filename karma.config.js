const webpackConfig = require('./config/webpack.dev.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/*spec.js'
    ],
    webpack: webpackConfig,
    exclude: [
    ],
    preprocessors: {
      'test/*spec.js': ['webpack', 'sourcemap']
    },
    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-sourcemap-loader'
    ],
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}