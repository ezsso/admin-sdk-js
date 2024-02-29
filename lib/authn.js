const debug = require('debug')('ezsso:admin:authn');

function authn(context) {
	const _url = (path) => context.url.replace(/\/+$/,'') + '/' + path.replace(/^\/+/,'');

	const _access_token = async () => {
		let stack = [];
		let access_token = context?.access_token;
		for(let i = 0; i < 10; i++) {
			if(!access_token) {
				return access_token;
			}

			if(typeof access_token == 'string') {
				return access_token;
			}

			if(access_token instanceof Promise) {
				stack.push('Promise');
				access_token = await access_token;
				continue;
			}

			if(access_token instanceof Function) {
				stack.push('Function');
				access_token = access_token();
				continue;
			}
	
			throw new Error('Type not allowed for access_token '+typeof access_token+' '+access_token);
		}
	};

	const _headers = async () => {
		const _headers = {
		};

		if(context?.access_token) {
			_headers.Authorization = 'Bearer '+ await _access_token(context);
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
			headers: await _headers()
		};
		return _fetch(url, options);
	};

	this.new = async () => {
		const url = _url('/api/authN');
		const options = {
			method: 'POST',
			credentials: 'include',
			headers: await _headers()
		};
		return _fetch(url, options);
	};

	this.del = async (id) => {
		const url = _url(`/api/authN/${id}`);
		const options = {
			method: 'DELETE',
			credentials: 'include',
			headers: await _headers()
		};
		return _fetch(url, options);
	};
}

module.exports = authn;

