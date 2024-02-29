const debug = require('debug')('ezsso:admin:authn');

const IDP = require('./idp');
// const AuthZ = require('./authz');

function authn(context) {

	this.ls = async () => {
		return context.utils.fetch('/api/authN', Object.assign({}, await context.utils.options()));
	};

	this.new = async () => {
		return context.utils.fetch('/api/authN', Object.assign({}, await context.utils.options(), { method: 'POST' }));
	};

	this.get = async (authn_id) => {
		return context.utils.fetch(`/api/authN/${authn_id}`, Object.assign({}, await context.utils.options()));
	};

	this.del = async (authn_id) => {
		return context.utils.fetch(`/api/authN/${authn_id}`, Object.assign({}, await context.utils.options(), { method: 'DELETE' }));
	};

	this.idp = async (authn_id) => new IDP(Object.assign({}, context, {authn: this, authn_id}));
	// this.authz = async (authn_id) => new AuthZ(Object.assign({}, context, {authn: this, authn_id}));
}

module.exports = authn;

