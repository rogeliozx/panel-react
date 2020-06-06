import React from "react";

import { Button } from "reactstrap";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleImageChange(e) {
    var { fileSelected } = this.props
    e.preventDefault();
    // let reader = new FileReader();
    for(let file of e.target.files) {
      fileSelected(file)
    }
    

    // reader.onloadend = () => {
    //   this.setState({
    //     file: file
    //   });
    // };
    // reader.readAsDataURL(file);
  }
  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  handleClick() {
    this.refs.fileInput.click();
  }
  render() {
    return (
      <div className="fileinput text-center">
        <input type="file" onChange={this.handleImageChange} ref="fileInput" multiple/>
        <div>
          <Button className="btn-round" onClick={() => this.handleClick()}>
            Add File
          </Button>
        </div>
      </div>
    );
  }
}

FileUpload.propTypes = {
};

export default FileUpload;
