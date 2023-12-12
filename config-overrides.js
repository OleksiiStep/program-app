const path = require("path");

module.exports = function override(config, env) {
  // Додайте поліфіли до опцій resolve.fallback
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "stream": require.resolve("stream-browserify"),
    "https": require.resolve("https-browserify"),
    "assert": require.resolve("assert/"),
    "url": require.resolve("url/"),
    "util": require.resolve("util/")
  };

  return config;
};
