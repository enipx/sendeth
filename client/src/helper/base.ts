import abi from './transactions.json';

export const Contract_ABI = abi.abi;
export const Contract_Address = '';

export const windowExistsHandler = () => {
  const windowExists =
    typeof window !== 'undefined' &&
    window.document;

  return !!windowExists;
};

export const truncateWalletHandler = (address?: string) => {
  const first = (address || '').substring(0, 6);
  const last = (address || '').slice(-6);

  return `${first}.....${last}`;
}