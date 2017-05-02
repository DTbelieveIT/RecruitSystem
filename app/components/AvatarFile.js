import { Upload, message, Button, Icon } from 'antd';
import React,{ Component , PropTypes} from 'react'

class AvatarFile extends React.Component {
  constructor(props){
    super(props)
  }  

  onChange = (info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.props.onChange(info)
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }    
  }

  render() {
    const props = {
      name: 'file',
      action: this.props.action,
      headers: {
        authorization: 'authorization-text',
      }
    };

    return (
      <Upload {...props} onChange={this.onChange} >
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
    );
  }
}

AvatarFile.PropTypes = {
  action:PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired
}

export default AvatarFile