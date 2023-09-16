 

const {airdropAddress, tokenAddress} = require('./contractsConfig')
console.log("🚀 ~ file: web3.js:4 ~ airdropAddress:",  airdropAddress)
console.log("🚀 ~ file: web3.js:4 ~ tokenAddress:",  tokenAddress)
const { ethers } = require('ethers');
const airdropContractABI = require("./abiAirdrop.json");
// Connect to your Ethereum provider (replace with your provider URL)
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

// Replace with your ERC20 token contract address and ABI
const tokenContractAddress =   tokenAddress ;
const tokenContractABI = require("./abi.json");

// Connect to the ERC20 token contract
const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractABI, provider);

const airdropContractAddress = airdropAddress;


// Connect to the ERC20 token contract
const airdropContract = new ethers.Contract(airdropContractAddress, airdropContractABI, provider);

// Function to get token balance of an address
export async function getTokenBalance(address) {
  try {
    const balance = await tokenContract.balanceOf(address);
    return balance.toString();
  } catch (error) {
    console.error('Error fetching token balance:', error);
    throw error;
  }
}

// Function to create payments to patients and mint tokens
export async function createPaymentToPatients(patientAddresses, sumPayment) {
  try {
    const tokensPerPatient = Math.round(sumPayment/(patientAddresses.length));   
    const amounts = new Array(patientAddresses.length).fill(tokensPerPatient);  
   //  const signer = provider.getSigner(); 
    const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);// Replace with your signer or wallet
    const airdropWithSigner = airdropContract.connect(signer);

    // Mint and distribute tokens to patients
    console.log('signer.address', signer.address)
    const gasPrice = await provider.getGasPrice(); 
    const tx = await airdropWithSigner.doAirdrop(signer.address, 
       patientAddresses, amounts 
       , { gasPrice: gasPrice, gasLimit:30000000 } 
     ); 
    await tx.wait();    
    return tx.hash;
  } catch (error) {
    console.error('Error creating payments to patients:', error);
    throw error;
  }
}
 
