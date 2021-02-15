var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const name = "HouseToken";
    const symbol = "HT";
    let currentOwner;
    //const TokerURI="https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name,symbol,{from: account_one});
            currentOwner = account_one;

            // TODO: mint multiple tokens
            // account_one have 2 Tokens => IDs[0,1]
            await this.contract.mint(account_one,0,{from: account_one});
            for (let i = 0 ; i<5 ; i++)
            {
                await this.contract.mint(accounts[i],i+1,{from: account_one});
            }
            
        })
        it('should return total supply', async function () { 
          const TotalSupply = await this.contract.totalSupply.call();
          assert.equal(TotalSupply.toNumber(), 6, "Total Supply should be 6");
            
        })

        it('should get token balance', async function () { 
            const tokenBalance1 = await this.contract.balanceOf(account_one);
            assert.equal(tokenBalance1.toNumber(), 2, "Token balance of account 1 is incorrect");
            const tokenBalance2 = await this.contract.balanceOf(account_two);
            assert.equal(tokenBalance2.toNumber(), 1, "Token balance of account 2 is incorrect");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
           // const uri = await this.contract.getBaseTokenURI.()
            const uri = await this.contract.tokenURI.call(1);
            assert.equal(uri,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1","Token URI is not correct");
        })
        
        it('should transfer token from one owner to another', async function () { 
            // get owner of token ID = 0 and test ownerof()
           const currentOwnerofID0 = await this.contract.ownerOf.call(0);
           assert.equal(currentOwnerofID0,account_one,"account1 should be the owner of TokenID 0");
           await this.contract.transferFrom(account_one,account_two,0)
           const newCurrentOwnerofID0 = await this.contract.ownerOf.call(0);
           assert.equal(newCurrentOwnerofID0,account_two,"failed to transfer");
        })
    });

    describe('have ownership properties', function () {

        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name,symbol,{from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let revert = false;
            try{
                await this.contract.mint(account_two, 10 , {from:account_two});
            } 
            catch(err) {
                revert=true;
            }
            assert.equal(revert,true, "mint() Caller is not the contract owner");
        })

        it('should return contract owner', async function () { 
                expect(await this.contract.getOwner({from: account_two})).to.equal(currentOwner); 
            });
            

    });
})