'use strict';

const Debug			= require('debug');
const debug			= new Debug('ezsso:admin:test:authn');

const chai	= require('chai');
const { expect } = chai;
chai.config.truncateThreshold = 0;

const EZSSOAdmin = require('../index');

describe('authn', async function() {

	before(async function() {
		this.context = {
			access_token: process.env.EZSSO_ADMIN_ACCESS_TOKEN
		};
		expect(this.context?.access_token).to.exist;
	});

	it('ls', async function () {
		const ezssoAdmin = new EZSSOAdmin(this.context);
		const authns = await ezssoAdmin.authn.ls();
		debug('authns:', authns);
	});

});
