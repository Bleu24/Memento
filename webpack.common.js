const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/main.js",
    mode: "none",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.bundle.js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|gif|jpeg|jpg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(woff2|woff|otf|ttf|eot)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            title: "Memento | To-Do App"
        })
    ]
}