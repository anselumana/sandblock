
module.exports = async function main(callback) {
    try {
        const Box = artifacts.require('Box');
        const box = await Box.deployed();
        // Set value
        await box.set(99);
        // Get and log value
        const value = await box.get();
        console.log(">_ Got value: " + value.toString());
        // Get all accounts
        const accounts = await web3.eth.getAccounts();
        console.log(">_ Got " + accounts.length + " accounts");
        console.log(accounts)
        callback(0);
    }
    catch (error) {
        console.error(error);
        callback(1);
    }
}