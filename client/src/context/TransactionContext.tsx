import { truncateWalletHandler, windowExistsHandler } from "@/helper/base";
import { connectWalletHandler, getEthereumContractHandler, getEthParsedAmount, isWalletConnectedHandler, sendEthereumHandler } from "@/helper/contract";
import { useToast } from "@oreo-ui/web";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

export type SendDetailsType = {
  address: string;
  amount: string;
  message: string;
  twitter: string;
}

export interface TransactionContextProps {
  connectWallet: () => void;
  currentAccount: string;
  sendDetails: SendDetailsType,
  setSendDetails: Dispatch<SetStateAction<SendDetailsType>>,
  sendTransaction: () => void;
  loading: boolean;
}

export interface TransactionProviderProps {
  children: React.ReactNode;
}

export const defaultSendDetails: SendDetailsType = {
  address: '',
  amount: '',
  message: '',
  twitter: ''
}

export const TransactionContext = createContext<TransactionContextProps>({
  currentAccount: '',
  connectWallet: () => {},
  sendTransaction: () => {},
  sendDetails: defaultSendDetails,
  setSendDetails: () => {},
  loading: false,
});

export const TransactionProvider = (props: TransactionProviderProps) => {
  const { children } = props;

  const toast = useToast();

  const [currentAccount, setCurrentAccount] = useState('');

  const [sendDetails, setSendDetails] = useState<SendDetailsType>(defaultSendDetails);

  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    const accounts = await connectWalletHandler();

    setCurrentAccount(accounts?.[0]);
  }

  const isWalletConnected = async () => {
    const accounts = await isWalletConnectedHandler() as unknown as any[];

    if (accounts) {
      setCurrentAccount(accounts?.[0]);
    }
  }

  const sendTransaction = async () => {
    const { address, amount, message } = sendDetails;

    if (windowExistsHandler() && address && amount) {
      // send transaction
      const transactionContract = getEthereumContractHandler()

      const parsedAmout = getEthParsedAmount(amount);

      await sendEthereumHandler({
        from: currentAccount,
        to: address,
        amount,
      })
      
      // store transaction to blockchain
      const transactionHash = await transactionContract.addToBlockchain(address, parsedAmout, message);

      setLoading(true);

      await transactionHash.wait();

      setLoading(false);

      toast.show({
        title: 'Transaction complete! 🎉',
        content: `Your transfer of ${amount} ETH to ${truncateWalletHandler(address)} was successful. 🚀`,
        colorScheme: 'green',
        withIcon: true,
        withCloseButton: true,
      })
    }
  }

  const value: TransactionContextProps = {
    connectWallet,
    currentAccount,
    sendDetails,
    setSendDetails,
    sendTransaction,
    loading
  };

  useEffect(() => {
    if (windowExistsHandler()) {
      isWalletConnected();
    }
  }, [])

  return (
    <TransactionContext.Provider value={value}>
      { children }
    </TransactionContext.Provider>
  )
}