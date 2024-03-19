const path = require('path');

module.exports = {
    entry: {
        index: './src/ts/index.ts'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
                include: path.resolve(__dirname, 'src/css')
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].bundle.min.js'
    }
};
