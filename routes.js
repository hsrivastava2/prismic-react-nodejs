
module.exports=function(app, prismic) {

	// React
	var React = require('react');
	var ReactDOMServer = require('react-dom/server');
	var Component = require('./component.jsx');
	var postComponent = require('./post.jsx');

	// Routing
	app.get('/', function(request, response) {
		var p = prismic.withContext(request, response);
		
		p.queryFirst('[[:d = at(document.type, "bloghome")]]', function (err, bloghome) {
			var page = request.params.p || '1';
			var options = {
				'page' : page,
				'orderings' :'[my.post.date desc]'
			};
			p.query('[[:d = at(document.type, "post")]]', options, function (err, resp) {
				var posts = [];
				for (var i = 0; i<resp.results.length; i++) {				
					var post = resp.results[i];		
					posts.push({
						uid: post.uid,
						postTitle: post.getText('post.title'),
						postDesc: post.getFirstParagraph().text
					});  	
				}
				var image = bloghome.getImage('bloghome.image');
				var props = {
					bloghome: {
						headline: bloghome.getText("bloghome.headline"),
						description: bloghome.getText("bloghome.description"),
						imgUrl: image ? image.getView("main").url : ''
					},
					posts: posts
				};
				var html = ReactDOMServer.renderToString(
					React.createElement(Component, props) 
				);
				response.render('index', { ReactComponent: html, props: JSON.stringify(props) });
			});	
		});
	});

	/**
	* Route for blog posts
	*/
	app.get('/blog/:uid', (req, res) => {
		// Define the uid from the url
		var uid = req.params.uid;
		var p = prismic.withContext(req, res);
		// Query the post by its uid
		p.getByUID('post', uid, function (err, post) {
			if(post) {
				// If a document is returned, render the post
				console.log('##################');
				console.log(post);
				console.log('##################');
				var blogpost = {
					postTitle: post.getText('post.title'),
					postDesc: post.getFirstParagraph().text
				};
				var html = ReactDOMServer.renderToString(
					React.createElement(postComponent, blogpost) 
				);
				res.render('post', { ReactComponent: html, props: JSON.stringify(post), post: post });
			} else {
			  // Else give an error
			  res.status(404).send(err);
			}
		});
	});
};