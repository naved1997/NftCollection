import Head from "next/head";
import styles from "../styles/Home.module.css";
import web3modal from "web3modal";
import { providers, Contract,utils } from "ethers";
import { useEffect, useState, useRef } from "react";
import { ChainConfig } from "../config";
import { joinSignature } from "ethers/lib/utils";
export default function Home() {
  const chainConfig = ChainConfig.bnb.testnet;
  const abi = chainConfig.abi;
  const contractAddress = chainConfig.address;
  const chainId = chainConfig.ChainConfig.chainId;
  const chainName = chainConfig.ChainConfig.chainName;
  const rpcUrl = chainConfig.ChainConfig.rpcUrls;

  const [walletConnected, setWalletConnected] = useState(false);
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [presaleEnded, setPresaleEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isowner, setOwner] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
  const web3ModalRef = useRef();
  const [account, updateAccount] = useState(null);
console.log(web3ModalRef)



  const getProviderorSigner = async (needSigner = false) =>{
    const provider = await web3ModalRef.current.connect();
    console.log(provider)
    const web3Provider= new providers.Web3Provider(provider)
    console.log(web3Provider)

    const network = await web3Provider.getNetwork();
    console.log(network)

    if (network.chainId != 80001) {
      window.alert("Change network to Matic");
      throw new Error("Change the network to right one");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
    console.log(web3Provider)

  }

const presaleMint = async() =>{
try{
const signer = await getProviderorSigner(true);

const nftcontract = new Contract(contractAddress,abi, signer);

const tx = nftcontract.presaleMint({value:utils.parseEther("0.02")});
setLoading(true);
await tx.wait();
setLoading(false);
window.alert("You have Minted Presale Nft");
}
catch(err){
  console.error(err);
};

}


const publicMint = async() =>{
  try{
  const signer = await getProviderorSigner(true);
  
  const nftcontract = new Contract(contractAddress,abi, signer);
  
  const tx = nftcontract.Mint({value:utils.parseEther("0.02")});
  setLoading(true);
  await tx.wait();
  setLoading(false);
  window.alert("You have Minted Nft");
  }
  catch(err){
    console.error(err);
  };
  
  }

const connectWallet = async() =>{
  try{
    await getProviderorSigner();
    setWalletConnected(true);
  }catch(err){
    console.error(err);
  }
  };


  const startPresale = async() => {
    try{
      const signer = await getProviderorSigner(true);

      const nftcontract = new Contract(contractAddress,abi,signer);
      const tx = await nftcontract.startPresale();
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("Presale Started!!");

    }
    catch(err){
      console.error(err);
    }
  }

  return (
<div>
  <head>
<title>Crypto Devs</title>
<meta name="description" content="Whitelist-Dapp"></meta>
<link rel="icon" href="/favicon.ico"></link>
  </head>
<div className={styles.main}>
  <div>
    <h1 className={styles.main}>Welcome to Crypto Devs </h1>
    <div className={styles.description}>
      Its an NFT collection for Developers in Crypto
    </div>
    <div className={styles.description}>{/*tokensminted*/}/20 NFT Minted</div>
  </div>
{/*renderbutton*/}
</div>
<div>
  <img className={styles.image} src="./cryptodevs/0.svg"/>
</div>
  <footer className={styles.footer}>
  Made with &#10084; by Crypto Devs

  </footer>
</div>
  )
}
