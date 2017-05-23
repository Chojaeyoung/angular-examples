module.exports = {
  // browser: "firefox",
  server: {
    baseDir: "src",
    "routes": {
      "/jspm_packages": "jspm_packages"
    },
    middleware: {
      // overrides the second middleware default with new settings
      // refer: https://github.com/bripkens/connect-history-api-fallback
      1: require('connect-history-api-fallback')({
        index: '/index.html',
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        // change HTML : <base href="/toh">
        rewrites: [
          { from: /\/hello.*/, to: '/hello.html' },
          { from: /\/toh.*/, to: '/toh.html' },
          { from: /\/top10.*/, to: '/top10.html' },
          { from: /\/template-syntax.*/, to: '/template-syntax.html' },
          { from: /\/calculator.*/, to: '/calculator.html' }
        ],
        verbose: false
      })
    }
  }
};
