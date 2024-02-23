const debug = require('debug')('ezsso:admin:authn');

function authn(context) {
	const url = (path) => context.url.replace(/\/+$/,'') + '/' + path.replace(/^\/+/,'');

	const headers = () => {
		const _headers = {
		};

		if(context?.access_token) {
			_headers.Authorization = 'Bearer '+context.access_token;
		}

		return _headers;
	};

	this.ls = async () => {
		const fetchUrl = url('/api/authN');
		const fetchOptions = {
			credentials: 'include',
			headers: headers()
		};

		debug('ls >', fetchUrl, fetchOptions);
		return fetch(fetchUrl, fetchOptions)
		.then(response => response.json())
		.then(data => {
		debug('ls <', fetchUrl, fetchOptions, data);
			return data;
		});
	};

	this.new = async () => {
		return fetch(url('/api/authN'), { method: 'POST', credentials: 'include', headers: headers() })
		.then(response => response.json());
	};

	this.del = async (id) => {
		fetch(url(`/api/authN/${id}`), { method: 'DELETE', credentials: 'include', headers: headers() })
		.then(response => response.json());
	};
}

module.exports = authn;

