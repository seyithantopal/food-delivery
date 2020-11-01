const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: 'js/[name].[contentHash].bundle.js',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contentHash].css',
			chunkFilename: 'css/[id].[contentHash].css',
		}),
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: false,
		}),
	],
});
