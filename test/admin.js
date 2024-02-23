'use strict';

const Debug			= require('debug');
const debug			= new Debug('ezsso:admin:test:admin');

const chai	= require('chai');
const { expect } = chai;
chai.config.truncateThreshold = 0;

const EZSSOAdmin = require('../index');

describe('admin', async function() {

	beforeEach(async function() {
		this.context = {
		};
	});

	it('new', async function () {
		const ezssoAdmin = new EZSSOAdmin(this.context);
		expect(ezssoAdmin).to.be.an.instanceof(EZSSOAdmin);
	});

	it('function', async function () {
		const ezssoAdmin = EZSSOAdmin(this.context);
		expect(ezssoAdmin).to.be.an.instanceof(EZSSOAdmin);
	});

});
