const debug = require('debug')('ezsso:admin:authn');

function authn(context) {
	const _url = (path) => context.url.replace(/\/+$/,'') + '/' + path.replace(/^\/+/,'');

	const _headers = () => {
		const _headers = {
		};

		if(context?.access_token) {
			_headers.Authorization = 'Bearer '+context.access_token;
		}

		return _headers;
	};

	const _fetch = async (url, options) => {
		debug('fetch >', url, options);
		return fetch(url, options)
		.then(async response => {
			if(response.status > 399) {
				const text = await response.text();
				debug('fetch !', url, response.status, response.statusText, text);
				throw new Error(response.statusText, { cause: text });
			}

			const data = await response.json();
			debug('fetch <', url, data);
			return data;
		});
	};

	this.ls = async () => {
		const url = _url('/api/authN');
		const options = {
			credentials: 'include',
			headers: _headers()
		};
		return _fetch(url, options);
	};

	this.new = async () => {
		const url = _url('/api/authN');
		const options = {
			method: 'POST',
			credentials: 'include',
			headers: _headers()
		};
		return _fetch(url, options);
	};

	this.del = async (id) => {
		const url = _url(`/api/authN/${id}`);
		const options = {
			method: 'DELETE',
			credentials: 'include',
			headers: _headers()
		};
		return _fetch(url, options);
	};
}

module.exports = authn;

