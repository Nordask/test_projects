const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/index.tsx',
   resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@src': path.resolve(__dirname, 'src')
    }
   },
   output: {
     path: path.join(__dirname, '/dist'),
     filename: 'bundle.min.js',
     publicPath: '/'
  },
   module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
   },
   plugins: [
     new HtmlWebpackPlugin({
       template: './src/index.html'
     })
   ]
}