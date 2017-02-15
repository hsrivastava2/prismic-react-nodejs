var React = require('react');
module.exports = React.createClass({
	
	getInitialState() {  //returns an Object of initial states.
		return { prismic: null };
	},
	componentDidMount: function() { //invoked immediately after a component is mounted.
  	},
	render: function() {	//it should examine this.props and this.state and return a single React element
		var style = {
			backgroundImage: "url("+this.props.bloghome.imgUrl+")"      
	    };	    
	    var key = 1;
	    var compThis = this;
	    var posts =  this.props.posts.map(function (post) {
	    	key++;
            return (
                <div key={key} className="blog-post" data-wio-id="WCGBeigAAH9tBjVd">						
					<h2>
						<a href={"/blog/" + post.uid}>{post.postTitle}</a>
					</h2>
					<p className="blog-post-meta">
						<span className="created-at"></span>
					</p>
					{post.postDesc}
				</div>
            );
        });
		return (
			<div>
				<div className="home">
					<div className="blog-avatar" style={style}></div>
					<h1 className="blog-title">{this.props.bloghome.headline}</h1>
					<p className="blog-description">{this.props.bloghome.description}</p>
				</div>
				<div className="blog-main">
					{posts}
				</div>		
			</div>
		);
	}
});