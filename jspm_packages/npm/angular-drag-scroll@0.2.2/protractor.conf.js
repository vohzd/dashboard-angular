/* */ 
(function(process) {
  var BROWSERS = {chrome: {
      directConnect: true,
      capabilities: {
        browserName: 'chrome',
        chromeOptions: {args: ['disable-extensions', '--no-sandbox', '--test-type=browser']}
      }
    }};
  var BROWSER = process.env.BROWSER ? BROWSERS[process.env.BROWSER] : BROWSERS.chrome;
  exports.config = {
    allScriptsTimeout: 100000,
    baseUrl: 'http://localhost:3333',
    specs: ['./test/e2e/**/*.js'],
    directConnect: BROWSER.directConnect,
    seleniumAddress: BROWSER.seleniumAddress,
    capabilities: BROWSER.capabilities,
    rootElement: 'body'
  };
})(require('process'));
