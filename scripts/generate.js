const secp = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');

const privKey1 = secp.utils.randomPrivateKey();
const privKey2 = secp.utils.randomPrivateKey();
const privKey3 = secp.utils.randomPrivateKey();

const pubKey1 = secp.getPublicKey(privKey1);
const pubKey2 = secp.getPublicKey(privKey2);
const pubKey3 = secp.getPublicKey(privKey3);

console.log(`Priv Key1: ${toHex(privKey1)}\n`);
console.log(`Pub Key1: ${toHex(pubKey1)}\n`);
console.log('====================');

console.log(`Priv Key2: ${toHex(privKey2)}\n`);
console.log(`Pub Key2: ${toHex(pubKey2)}\n`);

console.log('====================');
console.log(`Priv Key3: ${toHex(privKey3)}\n`);
console.log(`Pub Key3: ${toHex(pubKey3)}\n`);

