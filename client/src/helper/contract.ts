import { ethers, parseEther } from 'ethers'

import { Contract_ABI, Contract_Address } from '@/helper/base'

// return ethereum
export const getWindowEthereum = () => {
  const ethereum = 'ethereum' in window ? (window.ethereum as any) : undefined;

  return ethereum;
}

export const getEthereumContractHandler = () => {
  const ethereum = getWindowEthereum();

  let signer = null;
  let provider;

  // Connect to the MetaMask EIP-1193 object. This is a standard
  // protocol that allows Ethers access to make all read-only
  // requests through MetaMask.
  provider = new ethers.BrowserProvider(ethereum as any);

  // It also provides an opportunity to request access to write
  // operations, which will be performed by the private key
  // that MetaMask manages for the user.
  signer = provider.getSigner();

  const transactionContract = new ethers.Contract(Contract_Address, Contract_ABI, signer as any);

  console.log({ provider, signer, transactionContract });

  return transactionContract; 
}

export const isWalletConnectedHandler = async () => {
  const ethereum = getWindowEthereum();

  if (!ethereum) {
    // ...
    // alert('Please install metamask')
    return;
  }

  const accounts = await (ethereum as any).request({ method: 'eth_accounts' });

  return accounts;
}

export const connectWalletHandler = async () => {
  const ethereum = getWindowEthereum();

  if (!ethereum) {
    // ...
    // alert('Please install metamask')
    return;
  }

  try {
    const accounts = await (ethereum as any).request({ method: 'eth_requestAccounts' });

    return accounts;

  } catch (error) {
    console.error(`Ethereum error: ${error}`);
  }
}

export const getEthParsedAmount = (amount: string) => {
  return parseEther(amount);
}

export const sendEthereumHandler = async (options: { from: string, to: string, amount: string }) => {
  const { from, to, amount: _amount } = options;

  const amount = getEthParsedAmount(_amount);

  const ethereum = getWindowEthereum();

  if (ethereum) {
    await ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from,
        to,
        gas: '0x5208', // 21000 GWEI
        value: amount
      }]
    })
  }
}