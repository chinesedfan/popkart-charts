const config = require('./webpack.config.js');

config.mode = 'production';
config.output.publicPath = '/popkart-charts/dist/';

module.exports = config;
