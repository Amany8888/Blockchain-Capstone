// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var SquareVerifier = artifacts.require('SquareVerifier');

// - use the contents from proof.json generated from zokrates steps
//const proofFromJsonFile = require("../../zokrates/code/square/proof.json");
const proofFromJsonFile = {
    "proof": {
        "a": ["0x163e31f896f6c285ae35f07aed3867092bd78c917c5806ced87c8f0af0db977c", "0x00e18578837c06209310d883f324879458c3eca91b4b7274117629652a3ff5fd"],
        "b": [["0x051e3182e1d8509021a13f645c3d7ff6b6407c9f775d996dcc5c2dcf465210e5", "0x11cd0539f347acb1a170daff040d8242dbb84605c88c220f670e814a235f9fa5"], ["0x1694e5fa43987a184d57c69d388430671aeb1b44cb11edefe6be9056b65b7975", "0x07e6619aaaeb62176816245c3c00e9109a523bd4d69f486f54f95bdace98dd9d"]],
        "c": ["0x2dac9de6766dfd0bc40897add3d70c7512de95c06cd0791d078b670ff2d3870b", "0x0ac0648d8c19a74afba90abe02f6f2f9bd7c5c7f2aae82d063f1e3eb1a63c6d9"]
    },
    "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
}

 contract('SquareVerifier',accounts =>{

    describe('Test SquareVerifier',function(){
        const account_one = accounts[0];
        
        beforeEach(async function () { 
            this.contract = await SquareVerifier.new({from: account_one});
        })
        // Test verification with correct proof
        it('should verify correct proof' , async function (){
            let verified = await  this.contract.verifyTx.call(
                                                                proofFromJsonFile.proof.a,
                                                                proofFromJsonFile.proof.b,
                                                                proofFromJsonFile.proof.c,
                                                                proofFromJsonFile.inputs);
            assert.equal(verified,true,"It can't verify correct proof");                                                 
        })
        // Test verification with incorrect proof
        it('shouldnot verify incorrect proof', async function () {
            let verified = await this.contract.verifyTx.call(
                                                                proofFromJsonFile.proof.a,
                                                                proofFromJsonFile.proof.b, 
                                                                proofFromJsonFile.proof.a, // it should be 'c' not 'a'
                                                                proofFromJsonFile.inputs);
            assert.equal(verified, false, 'It should not accept an incorrect proof');
        })
    })
   
}) 

