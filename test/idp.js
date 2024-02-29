'use strict';

const Debug			= require('debug');
const debug			= new Debug('ezsso:admin:test:idp');

const chai	= require('chai');
const { expect } = chai;
chai.config.truncateThreshold = 0;

const EZSSOAdmin = require('../index');

describe('idp', async function() {

	before(async function() {
		this.context = {
			access_token: process.env.EZSSO_ADMIN_ACCESS_TOKEN
		};
		expect(this.context?.access_token).to.exist;
		this.ezssoAdmin = new EZSSOAdmin(this.context);
		this.authN = await this.ezssoAdmin.authn.new();

		this.idp = await this.ezssoAdmin.authn.idp(this.authN.id);

		this.dummyIDP = {
			id: 'dummyIDP',
			issuer: 'dummyIssuer', 
			client_id: 'dummyClientId',
			client_secret: 'dummyClientSecret',
			scopes_supported: 'dummyScopesSupported'
		};
	});

	after(async function() {
		await this.ezssoAdmin.authn.del(this.authN.id);
	});

	it('new', async function () {
		this.newIDP = await this.idp.new(this.dummyIDP);
		this.authN = await this.ezssoAdmin.authn.get(this.authN.id);
		const filtered = this.authN.idps.filter(idp => idp.id == this.newIDP.id);
		expect(filtered[0]?.id).to.equal(this.newIDP.id);
	});

	it('set', async function () {
		this.newIDP = await this.idp.set(this.newIDP.id, Object.assign({}, this.dummyIDP, { issuer: 'updatedDummyIssuer' }));
		this.authN = await this.ezssoAdmin.authn.get(this.authN.id);
		const filtered = this.authN.idps.filter(idp => idp.id == this.newIDP.id);
		expect(filtered[0]?.id).to.equal(this.newIDP.id);
		expect(filtered[0]?.issuer).to.equal('updatedDummyIssuer');
	});

	it('del', async function () {
		const delIDP = await this.idp.del(this.newIDP.id);
		this.authN = await this.ezssoAdmin.authn.get(this.authN.id);
		const filtered = this.authN.idps.filter(idp => idp.id == this.newIDP.id);
		expect(filtered.length).to.equal(0);
	});

});

