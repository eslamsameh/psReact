import React,{Component} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './text-editor.sass' 
class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = { text: '' } 
        this.handleChange = this.handleChange.bind(this)
      }
      handleChange(value) {
        this.setState({ text: value })
      }
      render() {
        return ([
          <ReactQuill className="myDivToPrint" theme="snow" value={this.state.text}
                      onChange={this.handleChange} />,
                      <div className="btn-print">
                        <button className="btn btn-dark" onClick={()=>{this.onPressPrint()}}>Print</button>
                      </div>
        ])
      }
      onPressPrint(){
        window.print();
      }
    }

export default TextEditor;
