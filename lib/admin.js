const debug = require('debug')('ezsso:admin');

const AuthN = require('./authn');

function Admin(...args) {
	if (!(this instanceof Admin)) {
		return new Admin(...args);
	}

	let [ context ] = args;
	if(!context) {
		context = {};
	}

	// Set defaults if missing
	Object.assign(context, {
		url: 'https://admin.ezsso.me/'
	}, context);

	this.authn = new AuthN(context);
}

module.exports = Admin;
