import { ViemLocalEip712Signer } from '@farcaster/hub-web';
import { privateKeyToAccount } from 'viem/accounts';
import { account } from './clients.ts';
import { getDeadline } from './helpers.ts';
import { getPublicKey } from './signer.ts';

// App account
export const appAccount = privateKeyToAccount('0x...');

const deadline = getDeadline();
const publicKey = await getPublicKey();

const getMetadata = async () => {
  const metadata = await eip712signer.getSignedKeyRequestMetadata({
    requestFid: 9152n, // App fid
    key: publicKey,
    deadline,
  });
  if (metadata.isOk()) {
    return metadata.value;
  }
};
