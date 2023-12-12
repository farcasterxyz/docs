import { ViemLocalEip712Signer } from '@farcaster/hub-web';
import { privateKeyToAccount } from 'viem/accounts';
import { getDeadline } from './helpers.ts';
import { getPublicKey } from './signer.ts';

// App account
export const appAccount = privateKeyToAccount('0x...');

const deadline = getDeadline();
const publicKey = await getPublicKey();

export const getMetadata = async () => {
  const eip712signer = new ViemLocalEip712Signer(appAccount);
  const metadata = await eip712signer.getSignedKeyRequestMetadata({
    requestFid: 9152n, // App fid
    key: publicKey,
    deadline,
  });
  if (metadata.isOk()) {
    return metadata.value;
  }
};
