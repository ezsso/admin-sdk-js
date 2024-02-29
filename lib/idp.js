const debug = require('debug')('ezsso:admin:idp');

function idp(context) {

	this.ls = async () => {
		return context.utils.fetch(`/api/authN/${context.authn_id}/idp`, Object.assign({}, await context.utils.options()));
	};

	this.new = async (idp) => {
		const options = Object.assign({}, await context.utils.options(), { method: 'POST', body: JSON.stringify(idp) });
		options.headers['Content-type'] = 'application/json';
		return context.utils.fetch(`/api/authN/${context.authn_id}/idp`, options);
	};

	this.set = async (idp_id, idp) => {
		const options = Object.assign({}, await context.utils.options(), { method: 'POST', body: JSON.stringify(idp) });
		options.headers['Content-type'] = 'application/json';
		return context.utils.fetch(`/api/authN/${context.authn_id}/idp/${idp_id}`, options);
	};

	this.del = async (idp_id) => {
		return context.utils.fetch(`/api/authN/${context.authn_id}/idp/${idp_id}`, Object.assign({}, await context.utils.options(), { method: 'DELETE' }));
	};

}

module.exports = idp;

