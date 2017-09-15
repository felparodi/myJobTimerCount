import webpack from 'webpack';

export default {
  resolve: {
    extensions: [ '.js', '.jsx']
  },
  entry: [
    // must be first entry to properly set public path
    './src/index'
  ],
  target: 'node', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'], },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file?name=[name].[ext]' },
      { test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap'] }
    ]
  }
};
