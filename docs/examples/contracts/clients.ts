import { createWalletClient, createPublicClient, custom } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { optimism } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: optimism,
  transport: custom(window.ethereum),
});

// JSON-RPC Account
export const [account] = await walletClient.getAddresses();

// Local Account
export const account = privateKeyToAccount('0x...');
