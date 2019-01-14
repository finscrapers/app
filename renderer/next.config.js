/*
const withSass = require('@zeit/next-sass');
module.exports = withSass({
  webpack(config, options) {
    config.target = 'electron-renderer';
    return config;
  }
  /*
  sassLoaderOptions: {
    sourceMap: true
  }
  
});
const withSass = require('@zeit/next-sass');
module.exports = withSass({
  webpack: config =>
    Object.assign(config, {
      target: 'electron-renderer'
    })
});
*/
const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  webpack: config =>
    Object.assign(config, {
      node: {
        __dirname: false
      },
      target: 'electron-renderer'
    })
});

exports.exportPathMap = () => ({
  '/start': {page: '/index'}
});
