/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"mongoose\"\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n\tdatabase: process.env.MONGO_URI || 'mongodb://localhost/rs',\n\tport: 9999\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./config/app.config.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./config/app.config.js?");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _user = __webpack_require__(9);\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nmodule.exports = function (app) {\n\t//User\n\tapp.get('/api/logon', _user2.default.signup);\n\tapp.post('/api/login', _user2.default.signin);\n}; //controllers\n\n//////////////////\n// WEBPACK FOOTER\n// ./config/routes.js\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///./config/routes.js?");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"body-parser\"\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"compression\"\n// module id = 4\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"express\"\n// module id = 5\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"morgan\"\n// module id = 6\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"path\"\n// module id = 7\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = '-----BEGIN RSA PRIVATE KEY-----\\\r\nMIICXQIBAAKBgQDMslFCqIOGIg3KI4DFP26yusorgBodCR6Hay3rFc/XRj0Un65n\\\r\nrWqZSoJRSWebuL0OQiQxaXQXm67uMdp6H7KIDWeIen/H1fyxpL8IfA8IBj6oCrBQ\\\r\nPTxCUQLXHFG8DZqPuMF1DvLwkc8f7bq6vrKJONdRxRlj4P2MwcK1stCbvwIDAQAB\\\r\nAoGAB7vE7ivHrE2lD7n/p3QaDo6YDMSuN+KcUKlv9q3ASHXS4PCXejtHB7uU6NVJ\\\r\nIMz994fwLh250RqEpWMkyfBgoknvLjbU3rKqV/OCXH+i4EMZHlKAswaDHb8yARiP\\\r\nirKG7yhWfcfZmDsWprsDgYpmDM5OVFIroPUzFxiJbUgIlmECQQDu+HIiqY2p2U9d\\\r\n+HKgbxM0iA6IYDM+z40m7IkiepB6KuY43PuFwrkIEJPkgrpJM21zY/clB8ARah3D\\\r\nfhlsj7KFAkEA20icIcD6HfgaH6k4mRrMFc9EWkw7rfh3t43L2YQeipUfcT89vVzf\\\r\nymB6fnEEZdK7X2Nd4dTvaJeJ6fLy+SLicwJAHQ7GyiI14J5VAUcxoQKAolWc9sZD\\\r\n1PJl5oLClhezM7e9sNJmHzizSSDC6vleb4I6X9qa9bzAhR2TKu9NZh7/BQJBAMEI\\\r\nAwEnmkWlcIGsejk0wLD2OspuTx7PGbvII8l/p08BBKOxMw0t44aINWx22pMz1WOb\\\r\n2joBMxrUQ0BhcIflsIcCQQC/aimdryuunqA+GZXDkhlIRnwAxwCzUJZPzIz7ZeYv\\\r\nF1e/IawbK2vaZF9D54hpqxyG/9TTFsITYtfMXKba87yM\\\r\n-----END RSA PRIVATE KEY-----';\n\n//////////////////\n// WEBPACK FOOTER\n// ./config/rsa_1024_priv.js\n// module id = 8\n// module chunks = 0\n\n//# sourceURL=webpack:///./config/rsa_1024_priv.js?");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _user = __webpack_require__(10);\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _nodeRsa = __webpack_require__(12);\n\nvar _nodeRsa2 = _interopRequireDefault(_nodeRsa);\n\nvar _rsa_1024_priv = __webpack_require__(8);\n\nvar _rsa_1024_priv2 = _interopRequireDefault(_rsa_1024_priv);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.signup = function (req, res) {\n\tvar _req$query = req.query,\n\t    account = _req$query.account,\n\t    password = _req$query.password;\n\n\tvar user = new _user2.default({\n\t\taccount: account,\n\t\tpassword: password\n\t});\n\tuser.save(function (err) {\n\t\tif (err) return next(err);\n\t\tres.send({ staus: 'success' });\n\t});\n};\n\nexports.signin = function (req, res) {\n\tvar _req$body = req.body,\n\t    account = _req$body.account,\n\t    password = _req$body.password;\n\n\tvar key = new _nodeRsa2.default(_rsa_1024_priv2.default);\n\tkey.setOptions({ encryptionScheme: 'pkcs1' });\n\tvar decrypted = key.decrypt(password, 'utf8');\n\tconsole.log(decrypted);\n\tres.send({ code: 200 });\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./controllers/user.js\n// module id = 9\n// module chunks = 0\n\n//# sourceURL=webpack:///./controllers/user.js?");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _mongoose = __webpack_require__(0);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _user = __webpack_require__(11);\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar User = _mongoose2.default.model('User', _user2.default);\n\nmodule.exports = User;\n\n//////////////////\n// WEBPACK FOOTER\n// ./models/user.js\n// module id = 10\n// module chunks = 0\n\n//# sourceURL=webpack:///./models/user.js?");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _mongoose = __webpack_require__(0);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar UserSchema = new _mongoose2.default.Schema({\n\taccount: {\n\t\tunique: true,\n\t\ttype: String\n\t},\n\tpassword: String,\n\tmeta: {\n\t\tcreateAt: {\n\t\t\ttype: Date,\n\t\t\tdefault: Date.now()\n\t\t},\n\t\tupdateAt: {\n\t\t\ttype: Date,\n\t\t\tdefault: Date.now()\n\t\t}\n\t}\n});\n\nmodule.exports = UserSchema;\n\n//////////////////\n// WEBPACK FOOTER\n// ./schemas/user.js\n// module id = 11\n// module chunks = 0\n\n//# sourceURL=webpack:///./schemas/user.js?");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-rsa\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"node-rsa\"\n// module id = 12\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22node-rsa%22?");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _express = __webpack_require__(5);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _path = __webpack_require__(7);\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _compression = __webpack_require__(4);\n\nvar _compression2 = _interopRequireDefault(_compression);\n\nvar _bodyParser = __webpack_require__(3);\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _morgan = __webpack_require__(6);\n\nvar _morgan2 = _interopRequireDefault(_morgan);\n\nvar _mongoose = __webpack_require__(0);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _appConfig = __webpack_require__(1);\n\nvar _appConfig2 = _interopRequireDefault(_appConfig);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar isDev = process.env.NODE_ENV !== 'production';\nvar port = _appConfig2.default.port;\nvar PORT = process.env.PORT || port;\nvar app = (0, _express2.default)();\n\n//connect MongoDB\n_mongoose2.default.connect(_appConfig2.default.database);\n_mongoose2.default.connection.on('error', function () {\n\tconsole.info('Error:Could not connect to MongoDB');\n});\n\n//distinguish env\nif (isDev) {\n\tconsole.log('The app is Dev');\n} else {\n\tconsole.log('The app is Production');\n}\n\n/**\r\n * middleware\r\n */\n//compress middleware\napp.use((0, _compression2.default)());\n//log middleware\napp.use((0, _morgan2.default)('dev'));\n//parse application/json\napp.use(_bodyParser2.default.json());\napp.use(_bodyParser2.default.urlencoded({ extended: true }));\n//static resource middleware\napp.use(_express2.default.static(_path2.default.join(__dirname, 'build'), { index: 'index.html' }));\n\n//process route\n__webpack_require__(2)(app);\n\napp.listen(PORT, '127.0.0.1', function () {\n\tconsole.log('The app(production) is run at http://localhost:' + PORT);\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./server.js\n// module id = 13\n// module chunks = 0\n\n//# sourceURL=webpack:///./server.js?");

/***/ })
/******/ ]);