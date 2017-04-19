webpackHotUpdate(4,{57:function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n\tvalue: true\n});\n\nvar _redux = __webpack_require__(25);\n\nvar _Const = __webpack_require__(13);\n\n/**\r\n * 登录的reducer\r\n */\nfunction loginReducer() {\n\tvar state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n\t\tdata: {\n\t\t\tcode: 500\n\t\t}\n\t};\n\tvar action = arguments[1];\n\n\tswitch (action.type) {\n\t\tcase _Const.REQUEST_DATA + _Const.LOGIN:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\tstatus: 0\n\t\t\t});\n\t\tcase _Const.RECEIVE_DATA + _Const.LOGIN:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\tdata: action.data,\n\t\t\t\tstatus: 1\n\t\t\t});\n\t\tcase _Const.REQUEST_FAIL + _Const.LOGIN:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\tstatus: -1\n\t\t\t});\n\t\tcase _Const.LOGIN + _Const.ACCOUNT:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\taccount: action.value\n\t\t\t});\n\t\tcase _Const.LOGIN + _Const.PASSWORD:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\tpassword: action.value\n\t\t\t});\n\t\tdefault:\n\t\t\treturn state;\n\t}\n}\n\n/**\r\n * 注册的reducer\r\n */\nfunction logonReducer() {\n\tvar state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n\t\tdata: {\n\t\t\tcode: 500\n\t\t}\n\t};\n\tvar action = arguments[1];\n\n\tswitch (action.type) {\n\t\tcase _Const.REQUEST_DATA + _Const.LOGON:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\tstatus: 0\n\t\t\t});\n\t\tcase _Const.RECEIVE_DATA + _Const.LOGON:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\tdata: action.data,\n\t\t\t\tstatus: 1\n\t\t\t});\n\t\tcase _Const.REQUEST_FAIL + _Const.LOGON:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\tstatus: -1\n\t\t\t});\n\t\tcase _Const.LOGON + _Const.ACCOUNT:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\taccount: action.value\n\t\t\t});\n\t\tcase _Const.LOGON + _Const.PASSWORD:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\tpassword: action.value\n\t\t\t});\n\t\tcase _Const.LOGON + _Const.PASSWORD_CONFIRM:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\tcpassword: action.value\n\t\t\t});\n\t\tcase _Const.LOGON + _Const.PHONE:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\tphone: action.value\n\t\t\t});\n\t\tcase _Const.LOGON + _Const.NAME:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\tname: action.value\n\t\t\t});\n\t\tdefault:\n\t\t\treturn state;\n\t}\n}\n\nexports.default = (0, _redux.combineReducers)({\n\tloginReducer: loginReducer,\n\tlogonReducer: logonReducer\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/reducers/index.js\n// module id = 57\n// module chunks = 4\n\n//# sourceURL=webpack:///./app/reducers/index.js?')}});