var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(8803, '192.168.248.64', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://192.168.248.64:8803/');
});
