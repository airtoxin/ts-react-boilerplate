const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AutoDllPlugin = require("autodll-webpack-plugin");
const InlineEnvironmentVariablesPlugin = require("inline-environment-variables-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "[name]-[hash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: "ts-loader" }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([
      {
        from: "node_modules/semantic-ui-css/semantic.min.css",
        to: "assets/semantic.min.css"
      }
    ]),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true
    }),
    new AutoDllPlugin({
      filename: "[name]-[hash].js",
      inject: true,
      entry: {
        react: ["react", "react-dom"]
      }
    }),
    new InlineEnvironmentVariablesPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  devServer: {
    port: process.env.DEV_SERVER_PORT,
    historyApiFallback: true,
    hot: true
  }
};
