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
		this.ezssoAdmin = new EZSSOAdmin(this.context);
	});

	it('ls', async function () {
		const authns = await this.ezssoAdmin.authn.ls();
	});

	it('new', async function () {
		const newAuthN = await this.ezssoAdmin.authn.new();
		const allAuthNs = await this.ezssoAdmin.authn.ls();
		const filtered = allAuthNs.filter(authn => authn.id == newAuthN.id);
		expect(filtered[0]?.id).to.equal(newAuthN.id);
	});

	it('del', async function () {
		const newAuthN = await this.ezssoAdmin.authn.new();
		let allAuthNs = await this.ezssoAdmin.authn.ls();
		let filtered = allAuthNs.filter(authn => authn.id == newAuthN.id);
		expect(filtered[0]?.id).to.equal(newAuthN.id);

		const delAuthN = await this.ezssoAdmin.authn.del(newAuthN.id);
		debug('delAuthN:', delAuthN);

		allAuthNs = await this.ezssoAdmin.authn.ls();
		debug('allAuthNs:', allAuthNs);

		filtered = allAuthNs.filter(authn => authn.id == newAuthN.id);
		debug('filtered:', filtered);
		expect(filtered.length).to.equal(0);
	});

});
