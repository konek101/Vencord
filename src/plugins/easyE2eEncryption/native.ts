import { IpcMainInvokeEvent } from 'electron';
import NodeRSA from 'node-rsa';



export function getKeyPair() {
    const nodeRSA = new NodeRSA();
    nodeRSA.generateKeyPair(2048);
    const publicKey = nodeRSA.exportKey('pkcs1-public-pem');
    const privateKey = nodeRSA.exportKey('pkcs1-private-pem');
    return {
        publicKey,
        privateKey
    };
}

export function encryptText(_: IpcMainInvokeEvent, plaintext: string , publickkey: string) {
    const nodeRSA = new NodeRSA();
    nodeRSA.importKey(publickkey, 'pkcs1-public-pem');
    const encrypted = nodeRSA.encrypt(plaintext, 'base64');

    return encrypted;

}
export function decryptCypher(_: IpcMainInvokeEvent, ciphertext: string, privateKey: string) {
    const nodeRSA = new NodeRSA();
    nodeRSA.importKey(privateKey, 'pkcs1-private-pem');

    const plaintext = nodeRSA.decrypt(ciphertext, 'utf16le');

    return plaintext;
}
