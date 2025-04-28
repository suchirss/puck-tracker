const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    background: "./src/background.ts",
    contentScript: "./src/contentScript.ts",
    popup: "./src/popup.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    environment: {
      arrowFunction: false,
      const: false,
      destructuring: false,
      forOf: false,
    },
  },
  devtool: false,
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "." },
        { from: "manifest.json", to: "." },
      ],
    }),
  ],
};
