const path = require(`path`);
const pathMain = path.join(__dirname, `public`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: pathMain
  },
  devtool: `source-map`,
  devServer: {
    contentBase: pathMain,
    compress: true,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      }
    ]
  },
  plugins: [
    new MomentLocalesPlugin()
  ]
};
