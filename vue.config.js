module.exports = {
  lintOnSave: false,
  filenameHashing: false,
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  }
};
