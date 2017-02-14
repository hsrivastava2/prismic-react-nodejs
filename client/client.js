var React = require('react');
var ReactDOM = require('react-dom');
var Component = require('../component.jsx');

//SCSS for module - when in dev mode (not including css thru link tag)
//require('./sass/style.scss');


ReactDOM.render(
	React.createElement(Component, window.initData), document.getElementById('react-view')
);