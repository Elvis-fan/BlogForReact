const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env) => {
    let dirPath, port;
    if (env.blogClient) {
        dirPath = 'blog';
        port = 3335;
    } else if (env.adminClient) {
        dirPath = 'admin';
        port = 4000;
    }

    return {
        entry: [
            'webpack/hot/dev-server', path.resolve(__dirname, `./${dirPath}/client/main.js`)
        ],
        output: {
            path: path.resolve(__dirname, `./${dirPath}/build`),
            publicPath: "/",
            // filename: '[name].[chunkhash:8].bundle.js', // 推荐使用 ，但是--hot会报错，
            filename: '[name].[hash:8].bundle.js', // --hot时使用，不推荐
            chunkFilename: '[name]-[id].[chunkhash:8].bundle.js', // 代码分割
        },
        // devtool: 'eval-source-map',

        devServer: {
            inline: true, //inline模式
            historyApiFallback: true, //不跳转
            // host:'172.19.10.253',
            port: port
        },
        module: {
            rules: [{
                test: /\.js|.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: [
                        'syntax-dynamic-import',
                        'transform-async-to-generator',
                        'transform-regenerator',
                        'transform-runtime'
                    ]
                }
            }, {
                test: /\.(less|css)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'less-loader']
                })
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }]
        },

        plugins: [
            new ExtractTextPlugin("styles.css"),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: true
            }),
            new htmlWebpackPlugin({
                template: `./${dirPath}/client/public/index.html`,
                title: '123',
                inject: true,
                minify: {
                    removeComments: false,
                    collapseWhitespace: false
                }
            }),
            new webpack.HotModuleReplacementPlugin()
        ]
    };
}