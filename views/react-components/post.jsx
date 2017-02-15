var React = require('react');
module.exports = React.createClass({
	getInitialState() {  //returns an Object of initial states.
		return { prismic: null };
	},
	componentDidMount: function() { //invoked immediately after a component is mounted.
  	},
	clickHandler: function(e){
		e.preventDefault();
		alert('clicked');
	},
	render: function() {	//it should examine this.props and this.state and return a single React element
		return (
			<div>
				<div className="home">
					<h1 className="blog-title">{this.props.postTitle}</h1>
					<p className="blog-description">{this.props.postDesc}</p>
				</div>
			</div>
		);
	}
});