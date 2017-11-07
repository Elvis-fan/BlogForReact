import React from 'react';
import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Input } from 'antd';
import { URL } from './../components/config';
class ColorPic extends Component {
    static propTypes = {
        expanded: PropTypes.bool,
        onExpandEvent: PropTypes.func,
        onChange: PropTypes.func,
        currentState: PropTypes.object,
    };

    stopPropagation = (event) => {
        event.stopPropagation();
    };

    onChange = (color) => {
        const { onChange } = this.props;
        onChange('color', color.hex);
    }

    renderModal = () => {
        const { color } = this.props.currentState;
        return (
            <div
                onClick={this.stopPropagation}
            >
                <BlockPicker color={color} onChangeComplete={this.onChange} />
            </div>
        );
    };


    render() {
        const { expanded, onExpandEvent } = this.props;
        return (
            <div
                aria-haspopup="true"
                aria-expanded={expanded}
                aria-label="rdw-color-picker"
            >
                <div
                    onClick={onExpandEvent}
                >
                    123
                </div>
                {expanded ? this.renderModal() : undefined}
            </div>
        );
    }
}

import  { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

class EditorCustomizedToolbarOption extends React.Component {
    state = {
        editorState: EditorState.createEmpty(),
        text:''
    }

    onEditorStateChange = (editorState) => {

        this.setState({
            editorState:editorState,
            text:this.htmlFormat(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        });

    };

    htmlFormat = ( text) => {
        for(let i=1;i<7;i++){
            let tex = text.split(new RegExp(`<h${i}`,'ig'));
            text=tex[0];
            for(let j=1;j<tex.length;j++){
                text += `<h${i} id="h${i}-${j}" ${tex[j]}`;

            }
        }
        return text;
    }

    onChange = (e)=>{
        console.log(e);
        }

    uploadImageCallBack = (file) => {
        console.log(file)
        return new Promise(
            (resolve, reject) => {

                const xhr = new XMLHttpRequest();
                xhr.open('POST', `${URL}article/test`);
                // xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }
    render(){
        const { TextArea } = Input;

        return (<div>
            <Editor


                onEditorStateChange={this.onEditorStateChange}
                editorState={this.state.editorState}
                toolbar={{
                    colorPicker: { component: ColorPic },
                    image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: false } },
                }}
                localization={{
                    locale: 'zh',
                }}
            />
            <TextArea rows={4} value={this.state.text} />
        </div>)

    }
}
export default EditorCustomizedToolbarOption;
