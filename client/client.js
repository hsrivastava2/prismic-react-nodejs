var React = require('react');
var ReactDOM = require('react-dom');
var Component = require('../component.jsx');
ReactDOM.render(
	React.createElement(Component, window.initData), document.getElementById('react-view')
);