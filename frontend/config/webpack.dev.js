const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: 'js/[name].bundle.js',
		publicPath: '/',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: 'css/[id].css',
		}),
		new ESLintPlugin(),
	],
	devServer: {
		port: 3000,
		hot: true,
		historyApiFallback: true,
	},
});
