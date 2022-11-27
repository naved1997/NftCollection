//SPDX-License-Identifier:MIT

pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


interface IWhitelist {
    function whitelistedAddresses(address) external view returns (bool);
}

contract CryptoDevs is ERC721Enumerable, Ownable{
 
 string _baseTokenURI;
 uint256 public price = 0.02 ether;

 bool public _paused;

 uint256 public maxTokenIds=20;

 uint256 public TokenIds;

 bool public presaleStarted;

 uint256 public presaleEnded;

 IWhitelist whitelist;

 modifier onlyWhenNotPaused{
    require(!_paused, "Contract is Paused");
    _;
 }

 constructor() ERC721("CryptoDevs", "CD"){
    _baseTokenURI= "https://www.forbes.ro/wp-content/uploads/2022/04/NFT-ELVILA.jpg";
    whitelist = IWhitelist(0xaf2e0C122F504174e6437862A2dCA67bE8a45fdB);
 }

function startPresale() public onlyOwner{
presaleStarted=true;
presaleEnded = block.timestamp + 5 minutes;
}


function presaleMint() public payable {
    require(presaleStarted && block.timestamp<presaleEnded,"Presale hasn't started");
    require(whitelist.whitelistedAddresses(msg.sender),"Sender is not Whitelisted");
    require(msg.value==price,"Send NFT price");
    require(TokenIds<maxTokenIds, "Max token id Minted");

    TokenIds+=1;
    _safeMint(msg.sender, TokenIds);
}

function Mint() public payable {
    require(block.timestamp>presaleEnded,"Presale is on");
    require(msg.value==price,"Send NFT price");
    require(TokenIds<maxTokenIds, "Max token id Minted");

        TokenIds+=1;
    _safeMint(msg.sender, TokenIds);

    }

function _baseURI() internal view virtual override returns(string memory){
    return _baseTokenURI;
}

function withdraw() public payable onlyOwner {
address _owner = owner();
uint256 amount =address(this).balance;
(bool sent,)= _owner.call{value:amount}("");
require(sent, "failed to withdraw");

}

receive() external payable{}
fallback() external payable{}

}
