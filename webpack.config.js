const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[name].[ext]'
  },
    devServer: {
        contentBase: './dist',
      },
    module: {
        rules: [
            {
            test: /\.(sa|sc|c)ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options : {
                        publicPath:"./"
                    },
                },
                {
                    loader: "css-loader",
                },
                {
                    loader: "sass-loader",
                }
            ],
            },
            {
              test: /\.html$/i,
              loader: 'html-loader',
              options: {
                attributes: {
                  list: [
                    {
                      tag: 'img',
                      attribute: 'src',
                      type: 'src',
                    },
                  ]
                }
              }
            },
          { test: /\.(png|svg|jpg|gif|webm|mp4)$/,
            use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false,
                name: "[name].[ext]",
                outputPath: "images/",
                publicPath: "images/",
              } 
            }
            ]
          },
        ]
    },
    plugins: [
          new HtmlWebpackPlugin({
            filename: "index.html", 
            template: path.resolve(__dirname, "src", "index.html")
          }),
          new HtmlWebpackPlugin({
            filename: "upload-page.html", 
            template: path.resolve(__dirname, "src", "upload-page.html")
          }),
          
        new MiniCssExtractPlugin({
            filename: "style.css"
          }),
    ]
}; 