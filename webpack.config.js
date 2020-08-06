const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

let outputFilename = "js/[name].js";
let outputCssFilename = "css/[name].css";

/*
if(process.env.NODE_ENV === "production"){
    outputFilename = "js/[name].[contenthash].js";
    outputCssFilename = "css/[name].[contenthash].css";
}
*/

module.exports = {
    entry: {
        global: ['./src/js/global.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: outputFilename
    },
    mode:process.env.NODE_ENV,
    devServer: {
        inline: false,
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: outputCssFilename,
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './src/html/index.html',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: [/fonts/],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './img',
                            esModule: false,
                            useRelativePath: true,
                        }
                    }
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: [/img/],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './fonts',
                            useRelativePath: false,
                        },
                    }
                ]
            },

            {
                test: /\.(sa|sc|c)ss$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            sourceMap:true
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url:true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap:true,
                            implementation: require("sass")
                        }
                    }
                ]
            },
        ]
    }
};
