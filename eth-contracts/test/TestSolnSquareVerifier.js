
// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const SquareVerifier = artifacts.require('SquareVerifier');
const expect = require('chai').expect;
const truffleAssert = require("truffle-assertions");
let proofJson = {
    "proof": {
        "a": ["0x163e31f896f6c285ae35f07aed3867092bd78c917c5806ced87c8f0af0db977c", "0x00e18578837c06209310d883f324879458c3eca91b4b7274117629652a3ff5fd"],
        "b": [["0x051e3182e1d8509021a13f645c3d7ff6b6407c9f775d996dcc5c2dcf465210e5", "0x11cd0539f347acb1a170daff040d8242dbb84605c88c220f670e814a235f9fa5"], ["0x1694e5fa43987a184d57c69d388430671aeb1b44cb11edefe6be9056b65b7975", "0x07e6619aaaeb62176816245c3c00e9109a523bd4d69f486f54f95bdace98dd9d"]],
        "c": ["0x2dac9de6766dfd0bc40897add3d70c7512de95c06cd0791d078b670ff2d3870b", "0x0ac0648d8c19a74afba90abe02f6f2f9bd7c5c7f2aae82d063f1e3eb1a63c6d9"]
    },
    "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
}

contract('TestSolnSquareVerifier', accounts => {
  describe('can verify soultion and mint token', () => {
    const account_one = accounts[0];
    const account_two = accounts[1];
    const name = "HouseToken";
    const symbol = "HT";
    let verifier;
    let solnSquareVerifier;

    beforeEach(async () => {
      verifier = await SquareVerifier.new({ from: account_one });
      solnSquareVerifier = await SolnSquareVerifier.new(verifier.address,name,symbol, {from: account_one});
    });
    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('can add a new solution', async () => {
      const tx = await solnSquareVerifier.addSolution(7, account_two, web3.utils.fromUtf8("123456789"), {from: account_two});
      truffleAssert.eventEmitted(tx, 'addedSolutionEvent', (ev) => {
        return expect(Number(ev.index)).to.equal(7) && expect(ev._address).to.equal(account_two);
        });
    });
    //  truffleAssert.eventEmitted(tx, "SolutionAdded", null, "Invalid event emitted"); 
    it("can mint an ERC721 token", async() => {
      let result = await solnSquareVerifier.mintVerifiedSolution.call(account_two, 1,
        proofJson.proof.a, proofJson.proof.b, proofJson.proof.c,
        proofJson.inputs,
        {from: account_one}
      );
      assert.equal(result, true, 'cannot mint an ERC721 token');
    });
  });
});