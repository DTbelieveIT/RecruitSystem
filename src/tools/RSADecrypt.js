/**
* rsa解密
*/
import NodeRSA from 'node-rsa'
import privKey from '../../config/rsa_1024_priv'

export function RSADecrypt(encryptedString){
	let key = new NodeRSA(privKey)
	key.setOptions({encryptionScheme: 'pkcs1'});
	let decrypted = key.decrypt(encryptedString, 'utf8')
	return decrypted
}