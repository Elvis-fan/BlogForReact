import * as React from 'react'
import { Menu, Icon, Row, Col, Button, Dropdown } from 'antd'
import { BlogEditor } from 'src/components'
import { connect } from 'react-redux'
import { classesAction, articlesAction, articleAction } from 'src/actions'
import { Classes as ClassesModel, Article as ArticleModel } from 'src/models'
import { BlogMenu } from '@/components'
import 'braft-editor/dist/index.css'
import './editor.less'
const mapStateToProps = (state: any, ownProps: any) => {
    const { Classes, Articles } = state
    return {
        article: Articles.Articles,
        classes: Classes.classes,
        articles: Articles.mainArticles,
    }
}
const mapDispatchToProps = (dispatch: any) => ({
    fetchClasses: (id: string, child: number = 0) => dispatch(classesAction({ id, child })),
    fetchArticles: (classes: string | number) => dispatch(articlesAction({ type: classes, page: 0, size: 9999 })),
    fetchArticle: (id: string | number) => dispatch(articleAction(id)),
})
interface Props {
    article: ArticleModel
    classes: ClassesModel[]
    articles: ArticleModel[]
    fetchArticle(id: string | number): void
    fetchClasses(pid: number | string, child?: number): void
    fetchArticles(classes: string | number): void
}
@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class Editor extends React.Component<Props, any>{

    componentWillMount() {
        const { fetchClasses, fetchArticles } = this.props
        fetchClasses(0, 1)
        fetchArticles(1)
    }
    classesClick = ({ key }: any) => {
        console.log(key)
        const { fetchArticles } = this.props
        fetchArticles(key)
    }


    articlesItemClick = ({ key }: any) => {
        const id = key.replace('article', '')
        const { fetchArticle } = this.props
        fetchArticle(id)
    }
    render() {
        const { classes, fetchClasses, articles }: Props = this.props
        const { classesClick } = this
        const q = ({ key }: any) => {
            // console.log(key)
        }
        return <Row className='editor'>
            <Col xs={{ span: 3 }} sm={{ span: 3 }} md={{ span: 3 }} lg={{ span: 3 }} className='editor-sidebar'>

                <Menu
                    onClick={classesClick}
                    defaultSelectedKeys={['0']}
                    // defaultOpenKeys={['0']}
                    mode='inline'
                >
                    <Menu.Item className='left' key={'0'}>最新</Menu.Item>
                    {
                        classes && classes.map(value => <Menu.SubMenu key={value.id} title={value.name}>
                            {
                                value.children && value.children.map(v1 => this.getClasse(v1))
                            }
                        </Menu.SubMenu>)
                    }
                </Menu>
            </Col>
            <Col xs={{ span: 4 }} sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 4 }} className='editor-middle'>
                <BlogMenu onClick={this.articlesItemClick} defaultSelectedKeys={['article0']}>

                    {
                        articles && articles.map(v => this.getArticle(v))
                    }
                </BlogMenu>

            </Col>
            <Col xs={{ span: 17 }} sm={{ span: 17 }} md={{ span: 17 }} lg={{ span: 17 }} className='editor-viewport'>
                <BlogEditor />
            </Col>

        </Row >
    }

    private getClasse(v1: ClassesModel): JSX.Element {
        return <Menu.Item key={v1.id} className='left'>
            <Dropdown trigger={['contextMenu']} overlay={(<Menu>
                <Menu.Item key={1}>新建</Menu.Item>
                <Menu.Item key={0}>重命名</Menu.Item>
                <Menu.Item key={2}>删除</Menu.Item>
            </Menu>)}>
                <div className='menu-item'>{v1.name}</div>
            </Dropdown>
        </Menu.Item>
    }

    private getArticle(v: ArticleModel): JSX.Element {
        return <BlogMenu.Item key={`article${v.id}`} data={`{'index':${v.id},'id':${v.id}}`}>
            <Dropdown trigger={['contextMenu']} overlay={(
                <Menu>
                    <Menu.Item key={1}>发布</Menu.Item>
                    <Menu.Item key={0}>移动</Menu.Item>
                    <Menu.Item key={2}>删除</Menu.Item>
                </Menu>
            )}>
                <div className='relative'>
                    <div className='menu-article-title color-4'>{v.title || '无标题'}</div>
                    <div className='menu-briefing font-5 color-5'>{v.briefing === '' || v.briefing === undefined || (v.briefing.length === 1 && v.briefing.charCodeAt(0).toString(16) === 'a') ? '无内容' : v.briefing}</div>
                    <div className='menu-date font-5 color-3'>{v.date}</div>
                    <div className='absolute article-setting' style={{}}><Icon type='setting' /></div>
                </div>
            </Dropdown>
        </BlogMenu.Item>
    }
}