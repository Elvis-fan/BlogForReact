import * as React from 'react'
import { Menu, Icon, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import BEditor from 'braft-editor'
import { classesAction } from 'src/actions'
import { Classes as ClassesModel } from 'src/models'
import { BlogMenu } from '@/components'
import 'braft-editor/dist/index.css'
const BraftEditor: any = BEditor
const { Item, SubMenu } = BlogMenu
const mapStateToProps = (state: any, ownProps: any) => {
    const { Classes } = state
    return {
        classes: Classes.classes,
    }
}
const mapDispatchToProps = (dispatch: any) => ({
    fetchClasses: (id: string, child: number = 0) => dispatch(classesAction({ id, child })),
})
interface Props {
    classes: ClassesModel[]
    fetchClasses(pid: number | string, option?: { child: boolean }): void
}
@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class Editor extends React.Component<Props, any>{
    state: any = {
        editorState: null,
    }
    componentWillMount() {
        const { fetchClasses } = this.props
        fetchClasses(0)
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
    subMenuCLick = ({ key }: any) => {
        const { fetchClasses }: Props = this.props
        fetchClasses(key, { child: true })
    }

    render() {
        const { classes, fetchClasses }: Props = this.props
        const { subMenuCLick } = this
        const q = ({ key }: any) => {
            console.log(key)
        }
        const { editorState } = this.state
        return <Row className='editor'>
            <Col xs={{ span: 3 }} sm={{ span: 3 }} md={{ span: 3 }} lg={{ span: 3 }} className='editor-sidebar'>

                <Menu
                    onClick={q}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode='inline'
                >
                    {
                        classes.map(value => <Menu.SubMenu key={value.id} title={value.name} onTitleClick={subMenuCLick}>
                            {
                                value.children && value.children.map(v1 => <Menu.Item key={v1.id}>{v1.name}</Menu.Item>)
                            }
                        </Menu.SubMenu>)
                    }
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