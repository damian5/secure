import * as CBOR from './cbor';

export const webAuthnSignup = async (email: string) => {
  const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
    // Challenge shoulda come from the server
    challenge: Uint8Array.from('someChallengeIsHereComOn', c => c.charCodeAt(0)),
    rp: {
      name: 'WebAuthn Test',
      // id: 'localhost:4200',
    },
    user: {
      // Some user id coming from the server
      id: Uint8Array.from(email, (c: any) => c.charCodeAt(0)),
      name: email,
      displayName: email,
    },
    pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      // requireResidentKey: true,
    },
    timeout: 60000,
    attestation: 'direct'
  };
  
  const key: any= await navigator.credentials.create({
    publicKey: publicKeyCredentialCreationOptions,
  });
  registerCredential(key)
}

export const webAuthnSignin = () => {
  const usersString  = localStorage.getItem('users');
  const user = usersString ? JSON.parse(usersString) : [];
  const allowCredentials: PublicKeyCredentialDescriptor[] = user.credentials.map((c: any) => {
    return { type: 'public-key', id: Uint8Array.from(Object.values(c.credentialId)) };
  });

  const credentialRequestOptions: PublicKeyCredentialRequestOptions = {
    challenge: Uint8Array.from('someChallengeIsHereComOn', c => c.charCodeAt(0)),
    allowCredentials,
  };

  return navigator.credentials.get({
    publicKey: credentialRequestOptions,
  });
}

const registerCredential = (credential: PublicKeyCredential) => {
  const user: any = { credentials: []}
  const authData = extractAuthData(credential);
  const credentialIdLength = getCredentialIdLength(authData);
  const credentialId: Uint8Array = authData.slice(55, 55 + credentialIdLength);
  const publicKeyBytes: Uint8Array = authData.slice(55 + credentialIdLength);
  const valid = true;

  if (valid) {
    user.credentials.push( { credentialId, publicKey: publicKeyBytes } );
    user.id = '' + Math.floor(Math.random() * 10000000);
    localStorage.setItem('users', JSON.stringify(user));
  }
  return valid;
}

const getCredentialIdLength = (authData: Uint8Array) => {
  const dataView = new DataView(new ArrayBuffer(2));
  const idLenBytes = authData.slice(53, 55);
  idLenBytes.forEach((value, index) => dataView.setUint8(index, value));
  return dataView.getUint16(0);
}

const extractAuthData = (credential: PublicKeyCredential) => {
  const decodedAttestationObj: any = CBOR.decode((credential.response as any).attestationObject);
  const { authData } = decodedAttestationObj;
  return authData;
}