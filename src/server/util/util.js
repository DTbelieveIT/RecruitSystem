/**
* rsa解密
*/
let NodeRSA = require('node-rsa') 
let privKey = require('../../../config/rsa_1024_priv') 

export function RSADecrypt(encryptedString){
	let key = new NodeRSA(privKey)
	key.setOptions({encryptionScheme: 'pkcs1'});
	let decrypted = key.decrypt(encryptedString, 'utf8')
	return decrypted
}


/**
 * node控制台颜色打印工具
 */
let color = require('colors-cli/safe')
let error = color.red.bold
let warn = color.yellow
let notice = color.blue
//错误
exports.error = error
// //警告
exports.warn = warn
//提醒
exports.notice = notice