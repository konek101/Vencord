import { IpcMainInvokeEvent } from 'electron';
import NodeRSA from 'node-rsa';

const nodeRSA = new NodeRSA();

export function getKeyPair() {
    nodeRSA.generateKeyPair(2048);
    const keypair = nodeRSA.generateKeyPair(2048);
    console.log(keypair.exportKey);

    return {
        //publicKey,
        //privateKey
    }
}

export function encryptText(_: IpcMainInvokeEvent, plaintext: String ,publickkey) {
    //let encrypted = nodeRSA.encryptStringWithRsaPublicKey({plaintext, publickkey});

    //return encrypted;

}
export function decryptCypher(_: IpcMainInvokeEvent, ciphertext: String, privateKey) {
    //let plaintext = nodeRSA.decryptStringWithRsaPrivateKey({ciphertext, privateKey});

    //return plaintext;
}
