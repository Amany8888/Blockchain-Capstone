pragma solidity >=0.4.21 <0.6.0;
import "./SquareVerifier.sol";
import "./ERC721Mintable.sol";
// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
/*when I wrote the contract interface it gave me this warning so I imported SquareVerifier.sol insteade
 "Duplicate contract names found for SquareVerifier.
  This can cause errors and unknown behavior. Please rename one of your contracts." 
contract SquareVerifier {
    function verifyTx(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input
        ) public
          returns
          (bool r);
}
*/

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete{
    SquareVerifier private verifierContract;
// TODO define a solutions struct that can hold an index & an address
struct solution{
    uint256 index;
    address _address;
}

// TODO define an array of the above struct
solution[] private solutions;

// TODO define a mapping to store unique solutions submitted
mapping(bytes32 => solution) private uniqueSolution;
mapping(bytes32 => bool) private uniqueSolution2;
// TODO Create an event to emit when a solution is added
event addedSolutionEvent(uint256 indexed index, address indexed _address);

constructor(address verifierAddress, string memory name, string memory symbol) 
        ERC721MintableComplete(name, symbol) 
        public 
    {
        verifierContract = SquareVerifier (verifierAddress);
    }


// TODO Create a function to add the solutions to the array and emit the event
function addSolution(uint256 index, address submitter, bytes32 solutionKey)public 
  {
    solution memory newSolution = solution(index, submitter);
    solutions.push(newSolution);
    uniqueSolution[solutionKey] = newSolution;
    uniqueSolution2[solutionKey] = true;
    emit addedSolutionEvent(index , submitter);
  }
modifier verifySolution(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) {
        require(verifierContract.verifyTx(a, b, c, input),
            "SolnSquareVerifier: Solution has invalid proof"
        );
        _;
    }
// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
function mintVerifiedSolution(
      address to,
      uint256 id,
      uint[2] memory a,
      uint[2][2] memory b,
      uint[2] memory c,
      uint[2] memory input
  )
      public
      verifySolution(a, b, c, input)
      returns(bool)
  {
      bytes32 solutionKey = keccak256(abi.encodePacked(a, b, c, input));
      require(
          uniqueSolution2[solutionKey] == false,
          "SolnSquareVerifier: solution is not unique"
      );
      addSolution(id, to, solutionKey);
      return mint(to, id);
  }
}


























