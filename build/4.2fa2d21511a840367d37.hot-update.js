webpackHotUpdate(4,{122:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(48);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(15);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(49);\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = combineReducers;\n\n\n\n\nfunction getUndefinedStateErrorMessage(key, action) {\n  var actionType = action && action.type;\n  var actionName = actionType && '\"' + actionType.toString() + '\"' || 'an action';\n\n  return 'Given action ' + actionName + ', reducer \"' + key + '\" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';\n}\n\nfunction getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {\n  var reducerKeys = Object.keys(reducers);\n  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__[\"a\" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';\n\n  if (reducerKeys.length === 0) {\n    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';\n  }\n\n  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__[\"a\" /* default */])(inputState)) {\n    return 'The ' + argumentName + ' has unexpected type of \"' + {}.toString.call(inputState).match(/\\s([a-z|A-Z]+)/)[1] + '\". Expected argument to be an object with the following ' + ('keys: \"' + reducerKeys.join('\", \"') + '\"');\n  }\n\n  var unexpectedKeys = Object.keys(inputState).filter(function (key) {\n    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];\n  });\n\n  unexpectedKeys.forEach(function (key) {\n    unexpectedKeyCache[key] = true;\n  });\n\n  if (unexpectedKeys.length > 0) {\n    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('\"' + unexpectedKeys.join('\", \"') + '\" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('\"' + reducerKeys.join('\", \"') + '\". Unexpected keys will be ignored.');\n  }\n}\n\nfunction assertReducerSanity(reducers) {\n  Object.keys(reducers).forEach(function (key) {\n    var reducer = reducers[key];\n    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__[\"a\" /* ActionTypes */].INIT });\n\n    if (typeof initialState === 'undefined') {\n      throw new Error('Reducer \"' + key + '\" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');\n    }\n\n    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');\n    if (typeof reducer(undefined, { type: type }) === 'undefined') {\n      throw new Error('Reducer \"' + key + '\" returned undefined when probed with a random type. ' + ('Don\\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__[\"a\" /* ActionTypes */].INIT + ' or other actions in \"redux/*\" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');\n    }\n  });\n}\n\n/**\n * Turns an object whose values are different reducer functions, into a single\n * reducer function. It will call every child reducer, and gather their results\n * into a single state object, whose keys correspond to the keys of the passed\n * reducer functions.\n *\n * @param {Object} reducers An object whose values correspond to different\n * reducer functions that need to be combined into one. One handy way to obtain\n * it is to use ES6 `import * as reducers` syntax. The reducers may never return\n * undefined for any action. Instead, they should return their initial state\n * if the state passed to them was undefined, and the current state for any\n * unrecognized action.\n *\n * @returns {Function} A reducer function that invokes every reducer inside the\n * passed object, and builds a state object with the same shape.\n */\nfunction combineReducers(reducers) {\n  var reducerKeys = Object.keys(reducers);\n  var finalReducers = {};\n  for (var i = 0; i < reducerKeys.length; i++) {\n    var key = reducerKeys[i];\n\n    if (false) {\n      if (typeof reducers[key] === 'undefined') {\n        warning('No reducer provided for key \"' + key + '\"');\n      }\n    }\n\n    if (typeof reducers[key] === 'function') {\n      finalReducers[key] = reducers[key];\n    }\n  }\n  var finalReducerKeys = Object.keys(finalReducers);\n\n  if (false) {\n    var unexpectedKeyCache = {};\n  }\n\n  var sanityError;\n  try {\n    assertReducerSanity(finalReducers);\n  } catch (e) {\n    sanityError = e;\n  }\n\n  return function combination() {\n    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];\n    var action = arguments[1];\n\n    if (sanityError) {\n      throw sanityError;\n    }\n\n    if (false) {\n      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);\n      if (warningMessage) {\n        warning(warningMessage);\n      }\n    }\n\n    var hasChanged = false;\n    var nextState = {};\n    for (var i = 0; i < finalReducerKeys.length; i++) {\n      var key = finalReducerKeys[i];\n      var reducer = finalReducers[key];\n      var previousStateForKey = state[key];\n      var nextStateForKey = reducer(previousStateForKey, action);\n      if (typeof nextStateForKey === 'undefined') {\n        var errorMessage = getUndefinedStateErrorMessage(key, action);\n        throw new Error(errorMessage);\n      }\n      nextState[key] = nextStateForKey;\n      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;\n    }\n    return hasChanged ? nextState : state;\n  };\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/redux/es/combineReducers.js\n// module id = 122\n// module chunks = 4\n\n//# sourceURL=webpack:///./~/redux/es/combineReducers.js?")},25:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('Object.defineProperty(__webpack_exports__, "__esModule", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(48);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(122);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(121);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(120);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(47);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(49);\n/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });\n/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });\n/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });\n/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });\n/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return __WEBPACK_IMPORTED_MODULE_4__compose__["a"]; });\n\n\n\n\n\n\n\n/*\n* This is a dummy function to check if the function name has been altered by minification.\n* If the function has been minified and NODE_ENV !== \'production\', warn the user.\n*/\nfunction isCrushed() {}\n\nif (false) {\n  warning(\'You are currently using minified code outside of NODE_ENV === \\\'production\\\'. \' + \'This means that you are running a slower development build of Redux. \' + \'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify \' + \'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) \' + \'to ensure you have the correct code for your production build.\');\n}\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/redux/es/index.js\n// module id = 25\n// module chunks = 4\n\n//# sourceURL=webpack:///./~/redux/es/index.js?')},26:function(module,exports,__webpack_require__){"use strict";eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(28);\n\nvar _reactRouter = __webpack_require__(14);\n\nvar _Button = __webpack_require__(52);\n\nvar _Button2 = _interopRequireDefault(_Button);\n\nvar _Radio = __webpack_require__(56);\n\nvar _Radio2 = _interopRequireDefault(_Radio);\n\nvar _EditText = __webpack_require__(53);\n\nvar _EditText2 = _interopRequireDefault(_EditText);\n\nvar _util = __webpack_require__(27);\n\nvar _Const = __webpack_require__(13);\n\nvar _actions = __webpack_require__(51);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Logon = function (_Component) {\n\t_inherits(Logon, _Component);\n\n\tfunction Logon(props) {\n\t\t_classCallCheck(this, Logon);\n\n\t\tvar _this = _possibleConstructorReturn(this, (Logon.__proto__ || Object.getPrototypeOf(Logon)).call(this, props));\n\n\t\t_this.state = {\n\t\t\tradioOption: [{\n\t\t\t\ttext: '个人用户',\n\t\t\t\tvalue: '0',\n\t\t\t\tname: 'role',\n\t\t\t\tchecked: true\n\t\t\t}, {\n\t\t\t\ttext: '企业用户',\n\t\t\t\tvalue: '1',\n\t\t\t\tname: 'role',\n\t\t\t\tchecked: false\n\t\t\t}, {\n\t\t\t\ttext: '管理员',\n\t\t\t\tvalue: '2',\n\t\t\t\tname: 'role',\n\t\t\t\tchecked: false\n\t\t\t}],\n\t\t\tdisplay: {\n\t\t\t\trole0: 'none',\n\t\t\t\trole1: 'none',\n\t\t\t\trole2: 'none',\n\t\t\t\tblock: false\n\t\t\t}\n\t\t};\n\t\treturn _this;\n\t}\n\n\t_createClass(Logon, [{\n\t\tkey: 'handleChangeRadio',\n\t\tvalue: function handleChangeRadio(index) {\n\t\t\tvar _radioOption = this.state.radioOption;\n\n\t\t\tfor (var r = 0; r < _radioOption.length; r++) {\n\t\t\t\t_radioOption[r].checked = false;\n\t\t\t}\n\n\t\t\t_radioOption[index].checked = true;\n\t\t\tthis.setState({ radioOption: _radioOption });\n\t\t}\n\t}, {\n\t\tkey: 'handleChange',\n\t\tvalue: function handleChange(child, id, value) {\n\t\t\tvar kind = _Const.LOGON;\n\t\t\tswitch (id) {\n\t\t\t\tcase 'account':\n\t\t\t\t\tkind += _Const.ACCOUNT;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'password':\n\t\t\t\t\tkind += _Const.PASSWORD;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'cpassword':\n\t\t\t\t\tkind += _Const.PASSWORD_CONFIRM;\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t\tvar parent = child._reactInternalInstance._currentElement._owner._instance;\n\t\t\tparent.props.dispatch((0, _actions.updateEditText)(value, kind));\n\t\t}\n\t}, {\n\t\tkey: 'checkInput',\n\t\tvalue: function checkInput(account, pwd, cpwd) {\n\t\t\tif (account.trim().length > 0 && pwd.trim().length > 0 && cpwd.trim().length > 0) {\n\t\t\t\tif (pwd.trim().length > 0 && pwd !== cpwd) return false;\n\t\t\t} else if (account.trim().length === 0) {\n\t\t\t\talert('注册账号不能为空！');\n\t\t\t\treturn false;\n\t\t\t} else if (pwd.trim().length === 0 || cpwd.trim().length === 0) {\n\t\t\t\talert('密码不能为空');\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\treturn true;\n\t\t}\n\t}, {\n\t\tkey: 'fillInfo',\n\t\tvalue: function fillInfo() {\n\t\t\tconsole.log('fill infomation');\n\t\t\tvar account = document.querySelector('#account').firstChild.value;\n\t\t\tvar password = document.querySelector('#password').firstChild.value;\n\t\t\tvar cpassword = document.querySelector('#cpassword').firstChild.value;\n\t\t\tvar role = document.querySelectorAll('#role input[type=radio]:checked')[0].value;\n\t\t\tconsole.log(role);\n\t\t\tif (this.checkInput(account, password, cpassword)) {\n\t\t\t\tvar roleStatus = {\n\t\t\t\t\trole0: 'none',\n\t\t\t\t\trole1: 'none',\n\t\t\t\t\trole2: 'none',\n\t\t\t\t\tblock: false\n\t\t\t\t};\n\t\t\t\troleStatus['role' + role] = 'block';\n\t\t\t\troleStatus['block'] = true;\n\t\t\t\tthis.setState({ display: roleStatus });\n\t\t\t} else {\n\t\t\t\talert('请检查格式');\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'logon',\n\t\tvalue: function logon() {\n\t\t\tconsole.log('logon');\n\t\t\tvar account = document.querySelector('#account').firstChild.value;\n\t\t\tvar password = document.querySelector('#password').firstChild.value;\n\t\t\tvar cpassword = document.querySelector('#cpassword').firstChild.value;\n\t\t\tvar role = document.querySelectorAll('#role input[type=radio]:checked')[0].value;\n\t\t\tvar dispatch = this._reactInternalInstance._currentElement._owner._instance.props.dispatch;\n\t\t\tdispatch = dispatch === undefined ? this.props.dispatch : dispatch;\n\t\t\tconsole.log('start logon');\n\t\t\tdispatch((0, _actions.fetchDataIfNeed)({\n\t\t\t\tmethod: 'POST',\n\t\t\t\tpath: '/logon',\n\t\t\t\tcategory: _Const.LOGON,\n\t\t\t\tquery: {\n\t\t\t\t\taccount: account,\n\t\t\t\t\tpassword: (0, _util.RSAEncrypt)(password),\n\t\t\t\t\trole: role\n\t\t\t\t}\n\t\t\t}));\n\t\t}\n\t}, {\n\t\tkey: 'handleKeyDown',\n\t\tvalue: function handleKeyDown(e) {\n\t\t\tif (e.keyCode === 13) {\n\t\t\t\tconsole.log('keyboard submit');\n\t\t\t\tthis.logon();\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'componentWillReceiveProps',\n\t\tvalue: function componentWillReceiveProps(nextProps) {\n\t\t\tif (nextProps.status === 1 && nextProps.data !== undefined) {\n\t\t\t\tif (nextProps.data.code === 200) {\n\t\t\t\t\talert('logon success');\n\t\t\t\t\t_reactRouter.browserHistory.replace('/login');\n\t\t\t\t} else {\n\t\t\t\t\talert('logon fail');\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'componentDidMount',\n\t\tvalue: function componentDidMount() {\n\t\t\t// document.querySelector('#account').firstChild.value = ''\n\t\t\t//       document.querySelector('#password').firstChild.value = ''\n\t\t\t//       document.querySelector('#cpassword').firstChild.value = ''\n\t\t\t//       document.querySelectorAll('#role input[type=radio]')[0].value = true\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'h1',\n\t\t\t\t\tnull,\n\t\t\t\t\t'\\u6CE8\\u518C\\u9875'\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ onKeyDown: this.handleKeyDown.bind(this) },\n\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.account, id: 'account', type: 'text', onChange: this.handleChange, placeholder: '\\u8F93\\u5165\\u4F60\\u7684\\u8D26\\u53F7', name: 'account' }),\n\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.password, id: 'password', type: 'password', onChange: this.handleChange, placeholder: '\\u8F93\\u5165\\u4F60\\u7684\\u5BC6\\u7801', name: 'password' }),\n\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.cpassword, id: 'cpassword', type: 'password', onChange: this.handleChange, placeholder: '\\u518D\\u6B21\\u8F93\\u5165\\u4F60\\u7684\\u5BC6\\u7801', name: 'cpassword' }),\n\t\t\t\t\t_react2.default.createElement(_Radio2.default, { options: this.state.radioOption, onChange: this.handleChangeRadio.bind(this), id: 'role' }),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ style: { display: this.state.display.role0 } },\n\t\t\t\t\t\t'\\u4E2A\\u4EBA\\u7528\\u6237'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ style: { display: this.state.display.role1 } },\n\t\t\t\t\t\t'\\u4F01\\u4E1A\\u7528\\u6237\\u7684\\u6CE8\\u518C\\u8D44\\u6599',\n\t\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.name, id: 'cpassword', type: 'password', onChange: this.handleChange, placeholder: '\\u7BA1\\u7406\\u5458\\u59D3\\u540D', name: 'name' }),\n\t\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.phone, id: 'cpassword', type: 'password', onChange: this.handleChange, placeholder: '\\u7BA1\\u7406\\u5458\\u624B\\u673A\\u53F7\\u7801', name: 'phone' })\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ style: { display: this.state.display.role2 } },\n\t\t\t\t\t\t'\\u7BA1\\u7406\\u5458'\n\t\t\t\t\t),\n\t\t\t\t\tthis.state.display.block ? _react2.default.createElement(_Button2.default, { onClick: this.logon.bind(this), id: 'logon', width: '100%', height: '4rem', radius: '.5rem', margin: '2% auto 2% auto', fontSize: '1.8rem', text: ' \\u6CE8 \\u518C ' }) : _react2.default.createElement(_Button2.default, { onClick: this.fillInfo.bind(this), id: 'next', width: '100%', height: '4rem', radius: '.5rem', margin: '2% auto 2% auto', fontSize: '1.8rem', text: ' \\u4E0B\\u4E00\\u6B65 ' })\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Logon;\n}(_react.Component);\n\nLogon.PropTypes = {\n\tstatus: _react.PropTypes.number.isRequired,\n\tdata: _react.PropTypes.object.isRequired,\n\taccount: _react.PropTypes.string.isRequired,\n\tpassword: _react.PropTypes.string.isRequired,\n\tcpassword: _react.PropTypes.string.isRequired,\n\tname: _react.PropTypes.string.isRequired,\n\tphone: _react.PropTypes.number.isRequired\n};\n\nLogon.defaultProps = {\n\tstatus: -3,\n\tdata: {}\n};\n\nfunction mapStateToProps(state) {\n\treturn {\n\t\tstatus: state.logonReducer.status,\n\t\tdata: state.logonReducer.data,\n\t\taccount: state.logonReducer.account,\n\t\tpassword: state.logonReducer.password,\n\t\tcpassword: state.logonReducer.cpassword,\n\t\tname: state.logonReducer.name,\n\t\tphone: state.logonReducer.phone\n\t};\n}\n\nmodule.exports = (0, _reactRedux.connect)(mapStateToProps)(Logon);\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/views/Logon.js\n// module id = 26\n// module chunks = 4\n\n//# sourceURL=webpack:///./app/views/Logon.js?")},48:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(15);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(124);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return ActionTypes; });\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = createStore;\n\n\n\n/**\n * These are private action types reserved by Redux.\n * For any unknown actions, you must return the current state.\n * If the current state is undefined, you must return the initial state.\n * Do not reference these action types directly in your code.\n */\nvar ActionTypes = {\n  INIT: '@@redux/INIT'\n};\n\n/**\n * Creates a Redux store that holds the state tree.\n * The only way to change the data in the store is to call `dispatch()` on it.\n *\n * There should only be a single store in your app. To specify how different\n * parts of the state tree respond to actions, you may combine several reducers\n * into a single reducer function by using `combineReducers`.\n *\n * @param {Function} reducer A function that returns the next state tree, given\n * the current state tree and the action to handle.\n *\n * @param {any} [preloadedState] The initial state. You may optionally specify it\n * to hydrate the state from the server in universal apps, or to restore a\n * previously serialized user session.\n * If you use `combineReducers` to produce the root reducer function, this must be\n * an object with the same shape as `combineReducers` keys.\n *\n * @param {Function} enhancer The store enhancer. You may optionally specify it\n * to enhance the store with third-party capabilities such as middleware,\n * time travel, persistence, etc. The only store enhancer that ships with Redux\n * is `applyMiddleware()`.\n *\n * @returns {Store} A Redux store that lets you read the state, dispatch actions\n * and subscribe to changes.\n */\nfunction createStore(reducer, preloadedState, enhancer) {\n  var _ref2;\n\n  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {\n    enhancer = preloadedState;\n    preloadedState = undefined;\n  }\n\n  if (typeof enhancer !== 'undefined') {\n    if (typeof enhancer !== 'function') {\n      throw new Error('Expected the enhancer to be a function.');\n    }\n\n    return enhancer(createStore)(reducer, preloadedState);\n  }\n\n  if (typeof reducer !== 'function') {\n    throw new Error('Expected the reducer to be a function.');\n  }\n\n  var currentReducer = reducer;\n  var currentState = preloadedState;\n  var currentListeners = [];\n  var nextListeners = currentListeners;\n  var isDispatching = false;\n\n  function ensureCanMutateNextListeners() {\n    if (nextListeners === currentListeners) {\n      nextListeners = currentListeners.slice();\n    }\n  }\n\n  /**\n   * Reads the state tree managed by the store.\n   *\n   * @returns {any} The current state tree of your application.\n   */\n  function getState() {\n    return currentState;\n  }\n\n  /**\n   * Adds a change listener. It will be called any time an action is dispatched,\n   * and some part of the state tree may potentially have changed. You may then\n   * call `getState()` to read the current state tree inside the callback.\n   *\n   * You may call `dispatch()` from a change listener, with the following\n   * caveats:\n   *\n   * 1. The subscriptions are snapshotted just before every `dispatch()` call.\n   * If you subscribe or unsubscribe while the listeners are being invoked, this\n   * will not have any effect on the `dispatch()` that is currently in progress.\n   * However, the next `dispatch()` call, whether nested or not, will use a more\n   * recent snapshot of the subscription list.\n   *\n   * 2. The listener should not expect to see all state changes, as the state\n   * might have been updated multiple times during a nested `dispatch()` before\n   * the listener is called. It is, however, guaranteed that all subscribers\n   * registered before the `dispatch()` started will be called with the latest\n   * state by the time it exits.\n   *\n   * @param {Function} listener A callback to be invoked on every dispatch.\n   * @returns {Function} A function to remove this change listener.\n   */\n  function subscribe(listener) {\n    if (typeof listener !== 'function') {\n      throw new Error('Expected listener to be a function.');\n    }\n\n    var isSubscribed = true;\n\n    ensureCanMutateNextListeners();\n    nextListeners.push(listener);\n\n    return function unsubscribe() {\n      if (!isSubscribed) {\n        return;\n      }\n\n      isSubscribed = false;\n\n      ensureCanMutateNextListeners();\n      var index = nextListeners.indexOf(listener);\n      nextListeners.splice(index, 1);\n    };\n  }\n\n  /**\n   * Dispatches an action. It is the only way to trigger a state change.\n   *\n   * The `reducer` function, used to create the store, will be called with the\n   * current state tree and the given `action`. Its return value will\n   * be considered the **next** state of the tree, and the change listeners\n   * will be notified.\n   *\n   * The base implementation only supports plain object actions. If you want to\n   * dispatch a Promise, an Observable, a thunk, or something else, you need to\n   * wrap your store creating function into the corresponding middleware. For\n   * example, see the documentation for the `redux-thunk` package. Even the\n   * middleware will eventually dispatch plain object actions using this method.\n   *\n   * @param {Object} action A plain object representing “what changed”. It is\n   * a good idea to keep actions serializable so you can record and replay user\n   * sessions, or use the time travelling `redux-devtools`. An action must have\n   * a `type` property which may not be `undefined`. It is a good idea to use\n   * string constants for action types.\n   *\n   * @returns {Object} For convenience, the same action object you dispatched.\n   *\n   * Note that, if you use a custom middleware, it may wrap `dispatch()` to\n   * return something else (for example, a Promise you can await).\n   */\n  function dispatch(action) {\n    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__[\"a\" /* default */])(action)) {\n      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');\n    }\n\n    if (typeof action.type === 'undefined') {\n      throw new Error('Actions may not have an undefined \"type\" property. ' + 'Have you misspelled a constant?');\n    }\n\n    if (isDispatching) {\n      throw new Error('Reducers may not dispatch actions.');\n    }\n\n    try {\n      isDispatching = true;\n      currentState = currentReducer(currentState, action);\n    } finally {\n      isDispatching = false;\n    }\n\n    var listeners = currentListeners = nextListeners;\n    for (var i = 0; i < listeners.length; i++) {\n      listeners[i]();\n    }\n\n    return action;\n  }\n\n  /**\n   * Replaces the reducer currently used by the store to calculate the state.\n   *\n   * You might need this if your app implements code splitting and you want to\n   * load some of the reducers dynamically. You might also need this if you\n   * implement a hot reloading mechanism for Redux.\n   *\n   * @param {Function} nextReducer The reducer for the store to use instead.\n   * @returns {void}\n   */\n  function replaceReducer(nextReducer) {\n    if (typeof nextReducer !== 'function') {\n      throw new Error('Expected the nextReducer to be a function.');\n    }\n\n    currentReducer = nextReducer;\n    dispatch({ type: ActionTypes.INIT });\n  }\n\n  /**\n   * Interoperability point for observable/reactive libraries.\n   * @returns {observable} A minimal observable of state changes.\n   * For more information, see the observable proposal:\n   * https://github.com/zenparsing/es-observable\n   */\n  function observable() {\n    var _ref;\n\n    var outerSubscribe = subscribe;\n    return _ref = {\n      /**\n       * The minimal observable subscription method.\n       * @param {Object} observer Any object that can be used as an observer.\n       * The observer object should have a `next` method.\n       * @returns {subscription} An object with an `unsubscribe` method that can\n       * be used to unsubscribe the observable from the store, and prevent further\n       * emission of values from the observable.\n       */\n      subscribe: function subscribe(observer) {\n        if (typeof observer !== 'object') {\n          throw new TypeError('Expected the observer to be an object.');\n        }\n\n        function observeState() {\n          if (observer.next) {\n            observer.next(getState());\n          }\n        }\n\n        observeState();\n        var unsubscribe = outerSubscribe(observeState);\n        return { unsubscribe: unsubscribe };\n      }\n    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {\n      return this;\n    }, _ref;\n  }\n\n  // When a store is created, an \"INIT\" action is dispatched so that every\n  // reducer returns their initial state. This effectively populates\n  // the initial state tree.\n  dispatch({ type: ActionTypes.INIT });\n\n  return _ref2 = {\n    dispatch: dispatch,\n    subscribe: subscribe,\n    getState: getState,\n    replaceReducer: replaceReducer\n  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/redux/es/createStore.js\n// module id = 48\n// module chunks = 4\n\n//# sourceURL=webpack:///./~/redux/es/createStore.js?")},56:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(12);\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n__webpack_require__(68);\n\nvar Radio = function (_Component) {\n\t_inherits(Radio, _Component);\n\n\tfunction Radio(props) {\n\t\t_classCallCheck(this, Radio);\n\n\t\treturn _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, props));\n\t}\n\n\t_createClass(Radio, [{\n\t\tkey: 'componentDidMount',\n\t\tvalue: function componentDidMount() {\n\t\t\tvar _options = this.props.options;\n\t\t\tfor (var i = 0; i < _options.length; i++) {\n\t\t\t\tif (_options[i].checked) {\n\t\t\t\t\t_reactDom2.default.findDOMNode(this.refs['radio-' + i]).className = 'on';\n\t\t\t\t} else {\n\t\t\t\t\t_reactDom2.default.findDOMNode(this.refs['radio-' + i]).className = '';\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'componentWillReceiveProps',\n\t\tvalue: function componentWillReceiveProps(nextProps) {\n\t\t\tvar _options = nextProps.options;\n\t\t\tfor (var i = 0; i < _options.length; i++) {\n\t\t\t\tif (_options[i].checked) {\n\t\t\t\t\t_reactDom2.default.findDOMNode(this.refs['radio-' + i]).className = 'on';\n\t\t\t\t} else {\n\t\t\t\t\t_reactDom2.default.findDOMNode(this.refs['radio-' + i]).className = '';\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'handleChecked',\n\t\tvalue: function handleChecked(index) {\n\t\t\tfor (var i in this.refs) {\n\t\t\t\t_reactDom2.default.findDOMNode(this.refs[i]).className = '';\n\t\t\t\t_reactDom2.default.findDOMNode(this.refs[i]).firstChild.checked = false;\n\t\t\t}\n\t\t\tvar _this = _reactDom2.default.findDOMNode(this.refs['radio-' + index]);\n\t\t\t_this.className = 'on';\n\t\t\t_this.firstChild.checked = true;\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar _this3 = this;\n\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ id: this.props.id },\n\t\t\t\tthis.props.options.map(function (item, index) {\n\t\t\t\t\treturn _react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ key: index, ref: 'radio-' + index, onClick: _this3.handleChecked.bind(_this3, index) },\n\t\t\t\t\t\t_react2.default.createElement('input', { type: 'radio', name: item.name, value: item.value, defaultChecked: item.checked, onChange: _this3.props.onChange.bind(_this3, index) }),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\titem.text\n\t\t\t\t\t\t)\n\t\t\t\t\t);\n\t\t\t\t})\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Radio;\n}(_react.Component);\n\nRadio.PropTypes = {\n\toptions: _react.PropTypes.object.isRequired,\n\tonChange: _react.PropTypes.func.isRequired\n};\n\nRadio.defaultProps = {\n\tid: '',\n\toption: {},\n\tonChange: function onChange() {}\n};\n\nexports.default = Radio;\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/components/Radio.js\n// module id = 56\n// module chunks = 4\n\n//# sourceURL=webpack:///./app/components/Radio.js?")},65:function(module,exports){eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/style/Button.less\n// module id = 65\n// module chunks = 4\n\n//# sourceURL=webpack:///./app/style/Button.less?")},66:function(module,exports){eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/style/EditText.less\n// module id = 66\n// module chunks = 4\n\n//# sourceURL=webpack:///./app/style/EditText.less?")},68:function(module,exports){eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/style/Radio.less\n// module id = 68\n// module chunks = 4\n\n//# sourceURL=webpack:///./app/style/Radio.less?")}});