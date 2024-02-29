const debug = require('debug')('ezsso:admin:utils');

function utils(context) {

	this.url = (path) => context.url.replace(/\/+$/,'') + '/' + path.replace(/^\/+/,'');

	this.access_token = async () => {
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
	
	this.headers = async () => {
		const headers = {
		};
	
		if(context?.access_token) {
			headers.Authorization = 'Bearer '+ await this.access_token(context);
		}
	
		return headers;
	};
	
	this.options = async () => {
		return {
			credentials: 'include',
			headers: await this.headers()
		};
	};

	this.fetch = async (path, options) => {
		const url = this.url(path);
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
	
}

module.exports = utils;

