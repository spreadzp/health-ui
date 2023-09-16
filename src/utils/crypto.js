import { ethers } from "ethers";
import EthCrypto from 'eth-crypto';

// Function to create an Ethereum account from a private key
export function createAccountFromPrivateKey(privateKey) {
  try {
    const wallet = new ethers.Wallet(privateKey);
    const address = wallet.address;
    return { address, privateKey };
  } catch (error) {
    console.error("Error creating account:", error.message);
    return null;
  }
}

// Function to create a private key from a hash
export function createPrivateKeyFromHash(mnemonicObj) {
  try {
    const privateKey = ethers.Wallet.fromMnemonic(mnemonicObj.mnemonic.phrase); 
    return privateKey;
  } catch (error) {
    console.error("Error creating private key:", error.message);
    return null;
  }
}

// Function to create a hash for a private key from a string
export function createHashForPrivateKeyFromString(inputString) { 
  const buffByteLike = fromStringToHash(inputString);
    const mnemonic = ethers.utils.entropyToMnemonic(buffByteLike) 
  try {
    const hash = ethers.Wallet.fromMnemonic(mnemonic);
    return hash;
  } catch (error) {
    console.error("Error creating hash:", error.message);
    return null;
  }
}

export function fromStringToHash (inputString) {
  const buffByteLike = ethers.utils.id(inputString)
  return buffByteLike;
}

export function createIdentity(inputString) {
  const messageHash = EthCrypto.hash.keccak256(inputString)
   
  const normalizedStr =  lengthMore128Chars(messageHash)
  const entropy = Buffer.from(normalizedStr, 'utf-8');
  const identity = EthCrypto.createIdentity(entropy);
  console.log("🚀 ~ file: crypto.js:54 ~ createIdentity ~ identity:", identity)
  return identity
}

export function lengthMore128Chars(str) {
  // Check if the string length is less than 128
  if (str.length < 128) {
    // Calculate how many characters are needed to reach 128
    const additionalCharsNeeded = 128 - str.length;
    // Create a string of '0's with the required length
    const additionalChars = '0'.repeat(additionalCharsNeeded);
    // Concatenate the original string and the additional characters
    return str + additionalChars;
  } else if (str.length === 128) {
    // If the string length is already 128, return it as is
    return str;
  } else {
    // If the string length is greater than 128, return the original string
    return str;
  }
}
export function publicKeyByPrivateKey(privKey){
  const publicKey = EthCrypto.publicKeyByPrivateKey(privKey);
  console.log("🚀 ~ file: crypto.js:44 ~ publicKeyByPrivateKey ~ publicKey:", publicKey)
  return publicKey;
} 

export function publicKeyToAddress(pubKey) {
  const address = EthCrypto.publicKey.toAddress(
    pubKey
);
  console.log("🚀 ~ file: crypto.js:52 ~ publicKeyToAddress ~ address:", address)
  return address;
}

export function sign(message, privateKey) {
  const messageHash = EthCrypto.hash.keccak256(message);
  const signature = EthCrypto.sign(
    privateKey, // privateKey
    messageHash // hash of message
  );
  console.log("🚀 ~ file: crypto.js:62 ~ sign ~ signature:", signature)
  return signature;
}

export function cipherParse (encryptedStr) {
  const encryptedCipher = EthCrypto.cipher.parse(encryptedStr);
  console.log("🚀 ~ file: crypto.js:68 ~ cipherParse ~ encryptedCipher:", encryptedCipher)
  return encryptedCipher;
}

export async function decryptWithPrivateKey(privateKey, encryptedCipher) {
  const message = await EthCrypto.decryptWithPrivateKey(
    privateKey, // privateKey
    encryptedCipher // encrypted-data
);
  console.log("🚀 ~ file: crypto.js:82 ~ decryptWithPrivateKey ~ message:", message)
  return JSON.parse(message)
}