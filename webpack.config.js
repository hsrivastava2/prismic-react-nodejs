
//REFERENCE : https://www.jonathan-petitcolas.com/2015/05/15/howto-setup-webpack-on-es6-react-application-with-sass.html

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
	entry: './client/client.js',
	/*entry: {
        client: [
            'webpack-dev-server/client?http://localhost:3000',
            './client/client.js',
        ]
    },*/
	output: {
		filename : 'bundle.js',
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
			},
			{
                test: /\.scss$/,
                //loaders: ['style-loader', 'css-loader', 'sass-loader'] //when in dev mode (not including css thru link tag)
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            }
		]
	},
	plugins: [
	 	new ExtractTextPlugin({ filename: 'stylesheets/style.css', disable: false, allChunks: true }),
	 	new StyleLintPlugin({syntax: 'scss', failOnError: false, configFile: './.stylelintrc', files: ['**/*.s?(a|c)ss']})
    ]
}