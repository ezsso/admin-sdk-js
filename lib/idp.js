const debug = require('debug')('ezsso:admin:idp');

function idp(context) {

	this.ls = async () => {
		return context.utils.fetch(`/api/authN/${context.authn_id}/idp`, Object.assign({}, await context.utils.options()));
	};

	this.new = async () => {
		return context.utils.fetch(`/api/authN/${context.authn_id}/idp`, Object.assign({}, await context.utils.options(), { method: 'POST' }));
	};

	this.del = async (idp_id) => {
		return context.utils.fetch(`/api/authN/${context.authn_id}/idp/${idp_id}`, Object.assign({}, await context.utils.options(), { method: 'DELETE' }));
	};

}

module.exports = idp;

