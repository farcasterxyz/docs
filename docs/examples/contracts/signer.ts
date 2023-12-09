import * as ed from '@noble/ed25519';
import { NobleEd25519Signer } from '@farcaster/hub-web';

const privateKeyBytes = ed.utils.randomPrivateKey();
export const signer = new NobleEd25519Signer(privateKeyBytes);

const getPublicKey = async () => {
  const signerKeyResult = await signer.getSignerKey();
  if (signerKeyResult.isOk()) {
    return signerKeyResult.value;
  }
};
