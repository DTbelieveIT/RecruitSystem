webpackHotUpdate(4,{26:function(module,exports,__webpack_require__){"use strict";eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(28);\n\nvar _reactRouter = __webpack_require__(14);\n\nvar _Button = __webpack_require__(52);\n\nvar _Button2 = _interopRequireDefault(_Button);\n\nvar _Radio = __webpack_require__(56);\n\nvar _Radio2 = _interopRequireDefault(_Radio);\n\nvar _EditText = __webpack_require__(53);\n\nvar _EditText2 = _interopRequireDefault(_EditText);\n\nvar _util = __webpack_require__(27);\n\nvar _Const = __webpack_require__(13);\n\nvar _actions = __webpack_require__(51);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Logon = function (_Component) {\n\t_inherits(Logon, _Component);\n\n\tfunction Logon(props) {\n\t\t_classCallCheck(this, Logon);\n\n\t\tvar _this = _possibleConstructorReturn(this, (Logon.__proto__ || Object.getPrototypeOf(Logon)).call(this, props));\n\n\t\t_this.state = {\n\t\t\tradioOption: [{\n\t\t\t\ttext: '个人用户',\n\t\t\t\tvalue: '0',\n\t\t\t\tname: 'role',\n\t\t\t\tchecked: true\n\t\t\t}, {\n\t\t\t\ttext: '企业用户',\n\t\t\t\tvalue: '1',\n\t\t\t\tname: 'role',\n\t\t\t\tchecked: false\n\t\t\t}, {\n\t\t\t\ttext: '管理员',\n\t\t\t\tvalue: '2',\n\t\t\t\tname: 'role',\n\t\t\t\tchecked: false\n\t\t\t}],\n\t\t\tdisplay: {\n\t\t\t\trole0: 'none',\n\t\t\t\trole1: 'none',\n\t\t\t\trole2: 'none',\n\t\t\t\tblock: false\n\t\t\t}\n\t\t};\n\t\treturn _this;\n\t}\n\n\t_createClass(Logon, [{\n\t\tkey: 'handleChangeRadio',\n\t\tvalue: function handleChangeRadio(index) {\n\t\t\tvar _radioOption = this.state.radioOption;\n\n\t\t\tfor (var r = 0; r < _radioOption.length; r++) {\n\t\t\t\t_radioOption[r].checked = false;\n\t\t\t}\n\n\t\t\t_radioOption[index].checked = true;\n\t\t\tthis.setState({ radioOption: _radioOption });\n\t\t}\n\t}, {\n\t\tkey: 'handleChange',\n\t\tvalue: function handleChange(child, id, value) {\n\t\t\tvar kind = _Const.LOGON;\n\t\t\tswitch (id) {\n\t\t\t\tcase 'account':\n\t\t\t\t\tkind += _Const.ACCOUNT;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'password':\n\t\t\t\t\tkind += _Const.PASSWORD;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'cpassword':\n\t\t\t\t\tkind += _Const.PASSWORD_CONFIRM;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'name':\n\t\t\t\t\tkind += _Const.NAME;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'phone':\n\t\t\t\t\tkind += _Const.PHONE;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'email':\n\t\t\t\t\tkind += _Const.EMAIL;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'job':\n\t\t\t\t\tkind += _Const.JOB;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'address':\n\t\t\t\t\tkind += _Const.ADDRESS;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'size':\n\t\t\t\t\tkind += _Const.SIZE;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'foundAt':\n\t\t\t\t\tkind += _Const.FOUNDAT;\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t\tvar parent = child._reactInternalInstance._currentElement._owner._instance;\n\t\t\tparent.props.dispatch((0, _actions.updateEditText)(value, kind));\n\t\t}\n\t}, {\n\t\tkey: 'checkInput',\n\t\tvalue: function checkInput(account, pwd, cpwd) {\n\t\t\tif (account.trim().length > 0 && pwd.trim().length > 0 && cpwd.trim().length > 0) {\n\t\t\t\tif (pwd.trim().length > 0 && pwd !== cpwd) return false;\n\t\t\t} else if (account.trim().length === 0) {\n\t\t\t\talert('注册账号不能为空！');\n\t\t\t\treturn false;\n\t\t\t} else if (pwd.trim().length === 0 || cpwd.trim().length === 0) {\n\t\t\t\talert('密码不能为空');\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\treturn true;\n\t\t}\n\t}, {\n\t\tkey: 'fillInfo',\n\t\tvalue: function fillInfo() {\n\t\t\tconsole.log('fill infomation');\n\t\t\tvar account = document.querySelector('#account').firstChild.value;\n\t\t\tvar password = document.querySelector('#password').firstChild.value;\n\t\t\tvar cpassword = document.querySelector('#cpassword').firstChild.value;\n\t\t\tvar role = document.querySelectorAll('#role input[type=radio]:checked')[0].value;\n\t\t\tconsole.log(role);\n\t\t\tif (this.checkInput(account, password, cpassword)) {\n\t\t\t\tvar roleStatus = {\n\t\t\t\t\trole0: 'none',\n\t\t\t\t\trole1: 'none',\n\t\t\t\t\trole2: 'none',\n\t\t\t\t\tblock: false\n\t\t\t\t};\n\t\t\t\troleStatus['role' + role] = 'block';\n\t\t\t\troleStatus['block'] = true;\n\t\t\t\tthis.setState({ display: roleStatus });\n\t\t\t} else {\n\t\t\t\talert('请检查格式');\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'logon',\n\t\tvalue: function logon() {\n\t\t\tconsole.log('logon');\n\t\t\tvar account = document.querySelector('#account').firstChild.value;\n\t\t\tvar password = document.querySelector('#password').firstChild.value;\n\t\t\tvar cpassword = document.querySelector('#cpassword').firstChild.value;\n\t\t\tvar role = document.querySelectorAll('#role input[type=radio]:checked')[0].value;\n\t\t\tvar name = document.querySelector('#name').firstChild.value;\n\t\t\tvar phone = document.querySelector('#phone').firstChild.value;\n\t\t\tvar email = document.querySelector('#email').firstChild.value;\n\t\t\tvar job = document.querySelector('#job').firstChild.value;\n\t\t\tvar address = document.querySelector('#address').firstChild.value;\n\t\t\tvar size = document.querySelector('#size').firstChild.value;\n\t\t\tvar foundAt = document.querySelector('#foundAt').firstChild.value;\n\t\t\tconsole.log(size);\n\t\t\tconsole.log(address);\n\t\t\tvar dispatch = this._reactInternalInstance._currentElement._owner._instance.props.dispatch;\n\t\t\tdispatch = dispatch === undefined ? this.props.dispatch : dispatch;\n\t\t\tconsole.log('start logon');\n\t\t\tdispatch((0, _actions.fetchDataIfNeed)({\n\t\t\t\tmethod: 'POST',\n\t\t\t\tpath: '/logon',\n\t\t\t\tcategory: _Const.LOGON,\n\t\t\t\tquery: {\n\t\t\t\t\taccount: account,\n\t\t\t\t\tpassword: (0, _util.RSAEncrypt)(password),\n\t\t\t\t\trole: role,\n\t\t\t\t\tname: name,\n\t\t\t\t\tphone: phone,\n\t\t\t\t\tjob: job,\n\t\t\t\t\temail: email,\n\t\t\t\t\tsize: size,\n\t\t\t\t\taddress: address,\n\t\t\t\t\tfoundAt: foundAt\n\t\t\t\t}\n\t\t\t}));\n\t\t}\n\t}, {\n\t\tkey: 'handleKeyDown',\n\t\tvalue: function handleKeyDown(e) {\n\t\t\tif (e.keyCode === 13) {\n\t\t\t\tconsole.log('keyboard submit');\n\t\t\t\tthis.logon();\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'componentWillReceiveProps',\n\t\tvalue: function componentWillReceiveProps(nextProps) {\n\t\t\tif (nextProps.status === 1 && nextProps.data !== undefined) {\n\t\t\t\tif (nextProps.data.code === 200) {\n\t\t\t\t\talert('logon success');\n\t\t\t\t\t_reactRouter.browserHistory.replace('/login');\n\t\t\t\t} else {\n\t\t\t\t\talert('logon fail');\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'componentWillUnmount',\n\t\tvalue: function componentWillUnmount() {\n\t\t\tthis.props.dispatch({ type: _Const.CLEAR });\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'h1',\n\t\t\t\t\tnull,\n\t\t\t\t\t'\\u6CE8\\u518C\\u9875'\n\t\t\t\t),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ onKeyDown: this.handleKeyDown.bind(this) },\n\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.account, id: 'account', type: 'text', onChange: this.handleChange, placeholder: '\\u8F93\\u5165\\u4F60\\u7684\\u8D26\\u53F7', name: 'account' }),\n\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.password, id: 'password', type: 'password', onChange: this.handleChange, placeholder: '\\u8F93\\u5165\\u4F60\\u7684\\u5BC6\\u7801', name: 'password' }),\n\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.cpassword, id: 'cpassword', type: 'password', onChange: this.handleChange, placeholder: '\\u518D\\u6B21\\u8F93\\u5165\\u4F60\\u7684\\u5BC6\\u7801', name: 'cpassword' }),\n\t\t\t\t\t_react2.default.createElement(_Radio2.default, { options: this.state.radioOption, onChange: this.handleChangeRadio.bind(this), id: 'role' }),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ style: { display: this.state.display.role0 } },\n\t\t\t\t\t\t'\\u4E2A\\u4EBA\\u7528\\u6237',\n\t\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.name, id: 'name', type: 'text', onChange: this.handleChange, placeholder: '\\u4E2A\\u4EBA\\u7528\\u6237\\u59D3\\u540D', name: 'name' }),\n\t\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.phone, id: 'phone', type: 'number', onChange: this.handleChange, placeholder: '\\u4E2A\\u4EBA\\u7528\\u6237\\u624B\\u673A\\u53F7\\u7801', name: 'phone' }),\n\t\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.email, id: 'email', type: 'email', onChange: this.handleChange, placeholder: '\\u4E2A\\u4EBA\\u7528\\u6237\\u90AE\\u7BB1', name: 'email' }),\n\t\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.job, id: 'job', type: 'text', onChange: this.handleChange, placeholder: '\\u4E2A\\u4EBA\\u7528\\u6237\\u5FC3\\u4EEA\\u5DE5\\u4F5C', name: 'job' })\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ style: { display: this.state.display.role1 } },\n\t\t\t\t\t\t'\\u4F01\\u4E1A\\u7528\\u6237\\u7684\\u6CE8\\u518C\\u8D44\\u6599',\n\t\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.name, id: 'name', type: 'text', onChange: this.handleChange, placeholder: '\\u4F01\\u4E1A\\u7528\\u6237\\u540D\\u79F0', name: 'name' }),\n\t\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.address, id: 'address', type: 'text', onChange: this.handleChange, placeholder: '\\u4F01\\u4E1A\\u7528\\u6237\\u5730\\u5740', name: 'address' }),\n\t\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.size, id: 'size', type: 'number', onChange: this.handleChange, placeholder: '\\u4F01\\u4E1A\\u7528\\u6237\\u89C4\\u6A21', name: 'size' }),\n\t\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.foundAt, id: 'foundAt', type: 'date', onChange: this.handleChange, placeholder: '\\u4F01\\u4E1A\\u7528\\u6237\\u6210\\u7ACB\\u65F6\\u95F4', name: 'foundAt' })\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ style: { display: this.state.display.role2 } },\n\t\t\t\t\t\t'\\u7BA1\\u7406\\u5458',\n\t\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.name, id: 'name', type: 'text', onChange: this.handleChange, placeholder: '\\u7BA1\\u7406\\u5458\\u59D3\\u540D', name: 'name' }),\n\t\t\t\t\t\t_react2.default.createElement(_EditText2.default, { margin: '.2rem 0 0 0', value: this.props.phone, id: 'phone', type: 'number', onChange: this.handleChange, placeholder: '\\u7BA1\\u7406\\u5458\\u624B\\u673A\\u53F7\\u7801', name: 'phone' })\n\t\t\t\t\t),\n\t\t\t\t\tthis.state.display.block ? _react2.default.createElement(_Button2.default, { onClick: this.logon.bind(this), id: 'logon', width: '100%', height: '4rem', radius: '.5rem', margin: '2% auto 2% auto', fontSize: '1.8rem', text: ' \\u6CE8 \\u518C ' }) : _react2.default.createElement(_Button2.default, { onClick: this.fillInfo.bind(this), id: 'next', width: '100%', height: '4rem', radius: '.5rem', margin: '2% auto 2% auto', fontSize: '1.8rem', text: ' \\u4E0B\\u4E00\\u6B65 ' })\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn Logon;\n}(_react.Component);\n\nLogon.PropTypes = {\n\tstatus: _react.PropTypes.number.isRequired,\n\tdata: _react.PropTypes.object.isRequired,\n\taccount: _react.PropTypes.string.isRequired,\n\tpassword: _react.PropTypes.string.isRequired,\n\tcpassword: _react.PropTypes.string.isRequired,\n\tname: _react.PropTypes.string.isRequired,\n\tphone: _react.PropTypes.number.isRequired,\n\temail: _react.PropTypes.string.isRequired,\n\tjob: _react.PropTypes.string.isRequired,\n\taddress: _react.PropTypes.string.isRequired,\n\tsize: _react.PropTypes.number.isRequired,\n\tfoundAt: _react.PropTypes.string.isRequired\n};\n\nLogon.defaultProps = {\n\tstatus: -3,\n\tdata: {}\n};\n\nfunction mapStateToProps(state) {\n\treturn {\n\t\tstatus: state.logonReducer.status,\n\t\tdata: state.logonReducer.data,\n\t\taccount: state.logonReducer.account,\n\t\tpassword: state.logonReducer.password,\n\t\tcpassword: state.logonReducer.cpassword,\n\t\tname: state.logonReducer.name,\n\t\tphone: state.logonReducer.phone,\n\t\temail: state.logonReducer.email,\n\t\tjob: state.logonReducer.job,\n\t\taddress: state.logonReducer.address,\n\t\tsize: state.logonReducer.size,\n\t\tfoundAt: state.logonReducer.foundAt\n\t};\n}\n\nmodule.exports = (0, _reactRedux.connect)(mapStateToProps)(Logon);\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/views/Logon.js\n// module id = 26\n// module chunks = 4\n\n//# sourceURL=webpack:///./app/views/Logon.js?")}});