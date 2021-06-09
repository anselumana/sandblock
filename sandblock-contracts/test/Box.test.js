// Load dependencies
const { expect } = require('chai');

// Load compiled artifacts
const Box = artifacts.require('Box');

// Start test block
contract('Box', function () {
    beforeEach(async function () {
        // Deploy a new Box contract for each test
        this.box = await Box.new();
    });

    // Test case
    it('get() returns a value previously set()', async function () {
        const value = 42;
        // Set a value
        await this.box.set(value);
        // Test if the returned value is the same one
        // Note that we need to use strings to compare the 256 bit integers
        expect((await this.box.get()).toString()).to.equal(value.toString());
    });
});