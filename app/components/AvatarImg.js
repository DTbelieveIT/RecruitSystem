import { Upload, Icon, message } from 'antd';
import React,{ Component , PropTypes} from 'react'
require('../style/AvatarImg.less')

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class AvatarImg extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        imageUrl:props.user.imgPath
      };
  }  

  handleChange = (info) => {
    if (info.file.status === 'done') {
      this.props.onChange(info)
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className="avatar-uploader"
        name="avatar"
        showUploadList={false}
        action={this.props.action}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl === this.props.imageUrl ?
            <img src={this.props.imageUrl} alt="默认头像" className="avatar" /> :
            <img src={imageUrl} alt="用户头像" className="avatar" />
        }
      </Upload>
    );
  }
}

AvatarImg.PropTypes = {
  imageUrl:PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired,
  action:PropTypes.string.isRequired,
  user:PropTypes.object.isRequired
}

export default AvatarImg