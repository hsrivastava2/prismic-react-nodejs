module.exports=function(app) {

	// React
	var React = require('react');
	var ReactDOMServer = require('react-dom/server');
	var Component = require('./views/react-components/component.jsx');
	var postComponent = require('./views/react-components/post.jsx');

	var Prismic = require('prismic-nodejs');
	// This is the configuration for prismic.io 
	var ENDPOINT = "https://manojanindian.prismic.io/api";
	var ACCESSTOKEN = null; // Only if your API is private 
	var LINKRESOLVER = function(doc) { // Describe your reverse routing here 
	  	if (doc.type == 'blog') {
	      	return '/blog';
	    }
	    if (doc.type == 'post') {
	      	return '/blog/' + encodeURIComponent(doc.uid);
	    }
	    return '/';
	};

	// This method will return a Promise of Api object 
	function api(req, res) {
	  res.locals.ctx = { // So we can use this information in the views 
	    endpoint: ENDPOINT,
	    linkResolver: LINKRESOLVER
	  };
	  return Prismic.api(ENDPOINT, {
	    accessToken: ACCESSTOKEN,
	    req: req
	  });
	}

	app.route('/').get(function(req, res) {
	  	api(req, res).then(function (api) {
		  	api.query(
		  		Prismic.Predicates.at('document.type', 'bloghome'),
		    	{ }
		    ).then(function(bloghome) {
		    	var image = bloghome.results[0].getImage('bloghome.image');
		    	var props = {
					bloghome: {
						headline: bloghome.results[0].getText("bloghome.headline"),
						description: bloghome.results[0].getText("bloghome.description"),
						imgUrl: image ? image.getView("main").url : ''
					},
					posts: []
				};
				api.query(
		  			Prismic.Predicates.at('document.type', 'post'),
		    		{ orderings : '[my.post.date desc]' }
		    	).then(function(blogposts) {
		    		var posts = [];
					for (var i = 0; i<blogposts.results.length; i++) {	
						var post = blogposts.results[i];
						posts.push({
							uid: post.uid,
							postTitle: post.getText('post.title'),
							postDesc: post.getFirstParagraph().text
						});
					}
					props.posts = posts;
					var html = ReactDOMServer.renderToString(
						React.createElement(Component, props) 
					);
					var indexData = { 
						props: JSON.stringify(props),
						ReactComponent: html
					};
					res.render('index', indexData);
		   		});
			});
	  	}).catch(function(err) {
	    	// Don't forget error management 
	    	res.status(500).send("Error 500: " + err.message);
	  	});
	});

	app.route('/blog/:uid').get(function(req, res) {
	  	var uid = req.params.uid;
	  	console.log(uid);
		api(req, res).then(function(api) {

			console.log(api.getByUID);
			api.getByUID('page', uid).then(function(pageContent) {
			    // pageContent contains the document content
			    console.log(pageContent);
			});

	  		api.query(
			    Prismic.Predicates.at('my.page.uid', uid)
			).then(function(post) {
			    console.log(post);
			    if(post) {
					// If a document is returned, render the post
					console.log(1);
					var blogpost = {
						postTitle: post.getText('post.title'),
						postDesc: post.getFirstParagraph().text
					};
					console.log(2);
					var html = ReactDOMServer.renderToString(
						React.createElement(postComponent, blogpost) 
					);
					console.log(3);
					var postPageData = { 
						ReactComponent: html, 
						props: JSON.stringify(post), 
						post: post 
					};
					res.render('post', postPageData);
				} else {
				  // Else give an error
				  res.status(404).send(err);
				}
			});


	  	}).catch(function(err) {
	    	// Don't forget error management 
	    	res.status(500).send("Error 500: " + err.message);
	  	});
	});

	app.route('/preview').get(function(req, res) {
	  api(req, res).then(function(api) {
	    return Prismic.preview(api, configuration.linkResolver, req, res);
	  }).catch(function(err) {
	    handleError(err, req, res);
	  });
	});

};