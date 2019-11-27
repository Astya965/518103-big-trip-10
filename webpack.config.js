const path = require(`path`);
const pathMain = path.join(__dirname, `public`);

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
    publicPath: `http://localhost:8080/`,
    compress: true,
    watchContentBase: true
  }
};
