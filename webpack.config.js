module.exports = {
	entry: './client/client.js',
	output: {
		filename : 'bundel.js',
		path: 'public'
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				exclude: /node-modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react']
				}
			}
		]
	}
}