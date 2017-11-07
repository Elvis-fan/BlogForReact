const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: [
        // 'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
        // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        // './client/main.js' // Your appʼs entry point
        'webpack/hot/dev-server', path.resolve(__dirname, './main.js')
    ],
    output: {

        path: path.resolve(__dirname, './__build__'),
        // chunkFilename: '[name].[chunkhash:8].chunk.js',
        // publicPath: path.resolve(__dirname, '/build/'),
        filename: 'bundle.js'
    },
    // devtool: 'eval-source-map',

    devServer: {
        inline: true,
        port: 33335
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
            loader: 'style-loader!css-loader!less-loader',
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
        new htmlWebpackPlugin({
            template: './public/index.html',
            title: '123',
            // inject:true,
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}