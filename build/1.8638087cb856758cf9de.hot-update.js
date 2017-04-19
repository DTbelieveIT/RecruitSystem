webpackHotUpdate(1,{57:function(module,exports,__webpack_require__){"use strict";eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(25);\n\nvar _reactRouter = __webpack_require__(13);\n\nvar _Button = __webpack_require__(128);\n\nvar _Button2 = _interopRequireDefault(_Button);\n\nvar _EditText = __webpack_require__(129);\n\nvar _EditText2 = _interopRequireDefault(_EditText);\n\nvar _util = __webpack_require__(125);\n\nvar _Const = __webpack_require__(50);\n\nvar _actions = __webpack_require__(126);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Logon = function (_Component) {\n\t_inherits(Logon, _Component);\n\n\tfunction Logon(props) {\n\t\t_classCallCheck(this, Logon);\n\n\t\treturn _possibleConstructorReturn(this, (Logon.__proto__ || Object.getPrototypeOf(Logon)).call(this, props));\n\t}\n\n\t_createClass(Logon, [{\n\t\tkey: 'handleChange',\n\t\tvalue: function handleChange(child, id, value) {\n\t\t\tvar kind = _Const.LOGON;\n\t\t\tswitch (id) {\n\t\t\t\tcase 'account':\n\t\t\t\t\tkind += _Const.ACCOUNT;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'password':\n\t\t\t\t\tkind += _Const.PASSWORD;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'cpassword':\n\t\t\t\t\tkind += _Const.PASSWORD_CONFIRM;\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t\tvar parent = child._reactInternalInstance._currentElement._owner._instance;\n\t\t\tparent.props.dispatch((0, _actions.updateEditText)(value, kind));\n\t\t}\n\t}, {\n\t\tkey: 'checkInput',\n\t\tvalue: function checkInput(account, pwd, cpwd) {\n\t\t\tif (account.trim().length > 0 && pwd.trim().length > 0 && cpwd.trim().length > 0) {\n\t\t\t\tif (pwd.trim().length > 0 && pwd !== cpwd) return false;\n\t\t\t} else if (account.trim().length === 0) {\n\t\t\t\talert('注册账号不能为空！');\n\t\t\t\treturn false;\n\t\t\t} else if (pwd.trim().length === 0 || cpwd.trim().length === 0) {\n\t\t\t\talert('密码不能为空');\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\treturn true;\n\t\t}\n\t}, {\n\t\tkey: 'logon',\n\t\tvalue: function logon() {\n\t\t\tconsole.log('logon');\n\t\t\tvar dispatch = this._reactInternalInstance._currentElement._owner._instance.props.dispatch;\n\t\t\tdispatch = dispatch === undefined ? this.props.dispatch : dispatch;\n\t\t\tvar account = document.querySelector('#account').firstChild.value;\n\t\t\tvar password = document.querySelector('#password').firstChild.value;\n\t\t\tvar cpassword = document.querySelector('#cpassword').firstChild.value;\n\t\t\tif (this.checkInput(account, password, cpassword)) {\n\t\t\t\tconsole.log('start logon');\n\t\t\t\tparent.props.dispatch((0, _actions.fetchDataIfNeed)({\n\t\t\t\t\tmethod: 'POST',\n\t\t\t\t\tpath: '/logon',\n\t\t\t\t\tcategory: _Const.LOGON,\n\t\t\t\t\tquery: {\n\t\t\t\t\t\taccount: account,\n\t\t\t\t\t\tpassword: (0, _util.RSAEncrypt)(password)\n\t\t\t\t\t}\n\t\t\t\t}));\n\t\t\t} else {\n\t\t\t\talert('请检查格式');\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'h1',\n\t\t\t\t\tnull,\n\t\t\t\t\t'\\u6CE8\\u518C\\u9875'\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.account, id: 'account', type: 'text', onChange: this.handleChange, placeholder: '\\u8F93\\u5165\\u4F60\\u7684\\u8D26\\u53F7', name: 'account' }),\n\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.password, id: 'password', type: 'password', onChange: this.handleChange, placeholder: '\\u8F93\\u5165\\u4F60\\u7684\\u5BC6\\u7801', name: 'password' }),\n\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.cpassword, id: 'cpassword', type: 'password', onChange: this.handleChange, placeholder: '\\u518D\\u6B21\\u8F93\\u5165\\u4F60\\u7684\\u5BC6\\u7801', name: 'cpassword' }),\n\t\t\t\t_react2.default.createElement(_Button2.default, { onClick: this.logon.bind(this), id: 'logon', width: '100%', height: '4rem', radius: '.5rem', margin: '2% auto 2% auto', fontSize: '1.8rem', text: ' \\u6CE8 \\u518C ' })\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Logon;\n}(_react.Component);\n\nLogon.PropTypes = {\n\tstatus: _react.PropTypes.number.isRequired,\n\tdata: _react.PropTypes.object.isRequired,\n\taccount: _react.PropTypes.string.isRequired,\n\tpassword: _react.PropTypes.string.isRequired,\n\tcpassword: _react.PropTypes.string.isRequired\n};\n\nLogon.defaultProps = {\n\tstatus: -3,\n\tdata: {}\n};\n\nfunction mapStateToProps(state) {\n\treturn {\n\t\tstatus: state.logonReducer.status,\n\t\tdata: state.logonReducer.data,\n\t\taccount: state.logonReducer.account,\n\t\tpassword: state.logonReducer.password,\n\t\tcpassword: state.logonReducer.cpassword\n\t};\n}\n\nmodule.exports = (0, _reactRedux.connect)(mapStateToProps)(Logon);\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/views/Logon.js\n// module id = 57\n// module chunks = 1\n\n//# sourceURL=webpack:///./app/views/Logon.js?")}});