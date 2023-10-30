const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/app.js',  // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'dist'),  // Output directory
        filename: 'app.js',  // Output filename
    },
    module: {
        rules: [
            // Define loaders for different file types (e.g., Babel for JavaScript)
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
          patterns: [
              { from: "index.html" },
              { from: "static", to: "static" },
              { from: "assets", to: "assets" },
        ],
        }),
    ],
};