const secp = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex, hexToBytes } = require("ethereum-cryptography/utils");

const hashMessage = (message) => keccak256(utf8ToBytes(message));

const recoverPublicKey = (messageHash, signature, recoveryBit) => secp.recoverPublicKey(messageHash, signature, recoveryBit);

const signatureToPublicKey = (message, signature) => {
    const messageHash = hashMessage(message);
    const signatureBytes = hexToBytes(signature);
    const recoveryBit = signatureBytes[0];
    const signaturePart = signatureBytes.slice(1);

    return toHex(recoverPublicKey(messageHash, signaturePart, recoveryBit));
};

const signMessage = async (messageHash, privateKey) => {
    const [signature, recoveryBit] = await secp.sign(messageHash, privateKey, { recovered: true });
    const completeSignature = new Uint8Array([recoveryBit, ...signature]);
    return toHex(completeSignature);
};

module.exports = {
    signatureToPublicKey,
    signMessage,
    hashMessage,
    recoverPublicKey,
};
