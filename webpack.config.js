const path = require('path');

module.exports = {
  // інші налаштування Webpack...
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "https": require.resolve("https-browserify"),
      "assert": require.resolve("assert/"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/")
    }
  },
  // інші налаштування...
};
