const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index",
  cache: false,
  mode: "development",
  devtool: "source-map",
  optimization: { minimize: false },

  output: {
    publicPath: "http://localhost:3001/",
  },

  resolve: { extensions: [".jsx", ".js", ".json"] },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("@babel/preset-react")],
        },
      },
      {
        test: /\.md$/,
        loader: "raw-loader",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "home",
      filename: "home.js",
      remotes: {},
      exposes: {
        Routes: "./src/Routes",
      },
      // shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
