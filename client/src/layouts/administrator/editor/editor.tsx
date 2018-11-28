import * as React from 'react'
import { Menu, Icon, Row, Col } from 'antd'
import BEditor from 'braft-editor'
import { BlogMenu } from '@/components'
import 'braft-editor/dist/index.css'
const BraftEditor: any = BEditor
const Item = BlogMenu.Item
export default class Editor extends React.Component<any, any>{
    state: any = {
        editorState: null,
    }
    handleEditorChange = (editorState: any) => {
        this.setState({ editorState })
    }
    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        console.log(htmlContent)
        // const result = await saveEditorContent(htmlContent)
    }

    render() {
        const q = () => { }
        const { editorState } = this.state
        return <Row className='editor'>
            <Col xs={{ span: 3 }} sm={{ span: 3 }} md={{ span: 3 }} lg={{ span: 3 }} className='editor-sidebar'>
                <BlogMenu onClick={q} defaultSelectedKeys={['article0']}>
                    <Item>123</Item>

                </BlogMenu>
                <Menu

                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode='inline'
                >
                    <Menu.Item key='3'>
                        <div>1231</div>
                        <div>12312</div>
                    </Menu.Item>
                    <Menu.Item key='4'>Option 4</Menu.Item>
                </Menu>
            </Col>
            <Col xs={{ span: 17 }} sm={{ span: 17 }} md={{ span: 17 }} lg={{ span: 17 }} className='editor-viewport'>
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                    onSave={this.submitContent}
                />
            </Col>

        </Row>
    }
}