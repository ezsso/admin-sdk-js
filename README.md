# admin-sdk-js

## Usage
```javascript
	const EZSSOAdmin = require('@ezsso/admin');

	const ezssoAdmin = new EZSSOAdmin({
		url: 'https://api.ezsso.me', // optional
		id:  'abcdef0123',
		access_token: 'eyz...',
		idp_id: 1 // optional, explicit idp_id for your browser idp or service2service idp
	});

	const authns = await ezssoAdmin.authn.ls();
	console.log('authns:', authns);
```
