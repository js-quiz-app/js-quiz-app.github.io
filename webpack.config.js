const path = require('path');

module.exports = {
    entry: './src/app.js',  // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'dist'),  // Output directory
        filename: 'bundle.js',  // Output filename
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
};