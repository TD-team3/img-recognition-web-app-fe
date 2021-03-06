const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    login: ["./src/index.js"],
    dragDrop: ["./src/dragDrop.js"],
    passwordRecovery: ["./src/passwordRecovery.js"]
  
  },
  output: {
    filename: "[name].min.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name].[ext]",
  },
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./",
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: true,
          attributes: {
            list: [
              {
                tag: "img",
                attribute: "src",
                type: "src",
              },
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif|webm|mp4)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "images/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src", "index.html"),
      chunks: ["login"],
    }),
    new HtmlWebpackPlugin({
      filename: "upload-page.html",
      template: path.resolve(__dirname, "src", "upload-page.html"),
      chunks: ["dragDrop"],
    }),
    new HtmlWebpackPlugin({
      filename: "sign-in.html",
      template: path.resolve(__dirname, "src", "sign-in.html"),
      chunks: ["login"],
    }),
    new HtmlWebpackPlugin({
      filename: "recovery-password.html",
      template: path.resolve(__dirname, "src", "recovery-password.html"),
      chunks: ["passwordRecovery"],
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
