const path = require("path");
const { VueLoaderPlugin } = require('vue-loader');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
    entry: ["@babel/polyfill", "./vue/src/main.js"],
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './build.js'
    },
    module: {
        rules: [
            //css
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            //vue
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            //js
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            ///file
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
            ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new NodePolyfillPlugin()
    ]
};
