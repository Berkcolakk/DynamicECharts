module.exports = {
  rollup(config, options) {
    config.output.format = "umd";
    config.output.sourcemap = false;
    return config;
  },
};
