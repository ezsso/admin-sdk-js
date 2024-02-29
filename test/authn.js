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
		this.allAuthNs = await this.ezssoAdmin.authn.ls();
	});

	it('new', async function () {
		this.newAuthN = await this.ezssoAdmin.authn.new();
		this.allAuthNs = await this.ezssoAdmin.authn.ls();
		const filtered = this.allAuthNs.filter(authn => authn.id == this.newAuthN.id);
		expect(filtered[0]?.id).to.equal(this.newAuthN.id);
	});

	it('del', async function () {
		const delAuthN = await this.ezssoAdmin.authn.del(this.newAuthN.id);
		debug('delAuthN:', delAuthN);

		this.allAuthNs = await this.ezssoAdmin.authn.ls();
		debug('allAuthNs:', this.allAuthNs);

		const filtered = this.allAuthNs.filter(authn => authn.id == this.newAuthN.id);
		debug('filtered:', filtered);
		expect(filtered.length).to.equal(0);
	});

});
