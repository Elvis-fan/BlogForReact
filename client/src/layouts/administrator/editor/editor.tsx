import * as React from 'react'
import { Menu, Icon, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import BEditor from 'braft-editor'
import { classesAction, articlesAction } from 'src/actions'
import { Classes as ClassesModel, Article as ArticleModel } from 'src/models'
import { BlogMenu } from '@/components'
import 'braft-editor/dist/index.css'
import './editor.less'
const BraftEditor: any = BEditor
const { Item, SubMenu } = BlogMenu
const mapStateToProps = (state: any, ownProps: any) => {
    const { Classes, Articles } = state
    return {
        classes: Classes.classes,
        articles: Articles.mainArticles,
    }
}
const mapDispatchToProps = (dispatch: any) => ({
    fetchClasses: (id: string, child: number = 0) => dispatch(classesAction({ id, child })),
    fetchArticles: (payload: any) => dispatch(articlesAction(payload)),
})
interface Props {
    classes: ClassesModel[],
    articles: ArticleModel[],
    fetchClasses(pid: number | string, child?: number): void
    fetchArticles({ type, page, size }: { type: number, page: number, size: number, more?: boolean }): void
}
@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class Editor extends React.Component<Props, any>{
    state: any = {
        editorState: null,
    }
    componentWillMount() {
        const { fetchClasses, fetchArticles } = this.props
        fetchClasses(0, 1)
        fetchArticles({ type: 1, page: 0, size: 9999 })
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
    // subMenuCLick = ({ key }: any) => {
    //     const { fetchClasses }: Props = this.props
    //     fetchClasses(key, { child: true })
    // }
    articlesItemClick() {

    }
    render() {
        const { classes, fetchClasses, articles }: Props = this.props
        console.log(articles)
        // const { subMenuCLick } = this
        const q = ({ key }: any) => {
            console.log(key)
        }
        const { editorState } = this.state
        return <Row className='editor'>
            <Col xs={{ span: 3 }} sm={{ span: 3 }} md={{ span: 3 }} lg={{ span: 3 }} className='editor-sidebar'>

                <Menu
                    onClick={q}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['1']}
                    mode='inline'
                >
                    {
                        classes.map(value => <Menu.SubMenu key={value.id} title={value.name}>
                            {
                                value.children && value.children.map(v1 => <Menu.Item key={v1.id}>{v1.name}</Menu.Item>)
                            }
                        </Menu.SubMenu>)
                    }
                </Menu>
            </Col>
            <Col xs={{ span: 4 }} sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 4 }} className='editor-middle'>
                <BlogMenu onClick={this.articlesItemClick} defaultSelectedKeys={['article0']}>

                    {
                        articles && articles.map(v => <BlogMenu.Item key={`article${v.id}`} data={`{'index':${v.id},'id':${v.id}}`}>
                            <div className='relative'>
                                <div className='menu-article-title color-4'>{v.title || '无标题'}</div>
                                <div className='menu-briefing font-5 color-5'>{v.briefing === '' || v.briefing === undefined || (v.briefing.length === 1 && v.briefing.charCodeAt(0).toString(16) === 'a') ? '无内容' : v.briefing}</div>
                                <div className='menu-date font-5 color-3'>{v.date}</div>
                                {/* <Dropdown trigger={['click']} overlay={(
                                    <Menu onClick={this.articleClick.bind(this)}>
                                        <Menu.Item key={1}>发布</Menu.Item>
                                        <Menu.Item key={0}>移动</Menu.Item>
                                        <Menu.Item key={2}>删除</Menu.Item>
                                    </Menu>
                                )}> */}
                                <div className='absolute article-setting' style={{}}><Icon type='setting' /></div>
                                {/* </Dropdown> */}


                            </div>
                        </BlogMenu.Item>)
                    }
                </BlogMenu>

            </Col>
            <Col xs={{ span: 17 }} sm={{ span: 17 }} md={{ span: 17 }} lg={{ span: 17 }} className='editor-viewport'>
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                    onSave={this.submitContent}
                />
            </Col>

        </Row >
    }
}