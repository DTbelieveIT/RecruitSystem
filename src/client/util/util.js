/**
* 工具类
*/

/**
* rsa加密
*/
export function RSAEncrypt(encryptString){
	const publicKey = '-----BEGIN PUBLIC KEY-----\
	MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMslFCqIOGIg3KI4DFP26yusor\
	gBodCR6Hay3rFc/XRj0Un65nrWqZSoJRSWebuL0OQiQxaXQXm67uMdp6H7KIDWeI\
	en/H1fyxpL8IfA8IBj6oCrBQPTxCUQLXHFG8DZqPuMF1DvLwkc8f7bq6vrKJONdR\
	xRlj4P2MwcK1stCbvwIDAQAB\
	-----END PUBLIC KEY-----'
	let encrypt = new JSEncrypt()
	encrypt.setPublicKey(publicKey)
	encryptString = encrypt.encrypt(encryptString)
	return encryptString
}

/**
 * 将字典转化为GET中query的模式
 */
export function dictToString(dict,split='&') {
	let result = '';
	for (let key in dict) {
		try {
			if (result === '') {
				result = key + '=' + dict[key];
			} else {
				result += split + key + '=' + dict[key];
			}
		} catch (error) {
			console.log(error);
		}
	}
	return result;
}

/**
 * 将字典转化为POST中query json的模式
 */
export function dictToJson(dict){
	let result = '';
	try{
			result = JSON.stringify(dict);
		}catch(error){
			console.log(error)
	}
	return result;
}

/**
 * 空对象
 */
export function isEmptyObject(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
} 

/**
 * localStorageService
 */
class localStorageService {
	//获取item
	getItem = (key) => {
		let value
		try{
			value = JSON.parse(window.localStorage.getItem(key))
		}catch(err){
			value = window.localStorage.getItem(key)
		}
		return value
	}
	//设置item
	setItem = (key,value) => {
        if ( typeof value === 'string' ) {
			window.localStorage.setItem(key,value)
        } else {
            window.localStorage.setItem( key, JSON.stringify( value ))
        }		
	}
	//清除某项
	cleanItem = (key) => {
		window.localStorage.removeItem(key)
	}

	//清空所有
	clearAll = () => {
		window.localStorage.clear()
	}
}
export const ls = new localStorageService()

/**
*  判断数组是否存在否元素
*/
export function contains(arr, obj) {  
    var i = arr.length;  
    while (i--) {  
        if (arr[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
}  