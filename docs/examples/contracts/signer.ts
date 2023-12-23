import * as ed from '@noble/ed25519';
import { NobleEd25519Signer } from '@farcaster/hub-web';

const privateKeyBytes = ed.utils.randomPrivateKey();
export const accountKey = new NobleEd25519Signer(privateKeyBytes);

export const getPublicKey = async () => {
  const accountKeyResult = await accountKey.getSignerKey();
  if (accountKeyResult.isOk()) {
    return accountKeyResult.value;
  }
};
