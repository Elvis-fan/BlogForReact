import * as React from 'react'
import { Menu, Icon, Row, Col, Dropdown, message, Input } from 'antd'
import BlogEditor from 'src/components/editor'
import { connect } from 'react-redux'
import { classesAction, articlesAction, articleAction, postArticleStatusAction, postClassesAction, delClassAction } from 'src/actions'
import { Classes as ClassesModel, Article as ArticleModel } from 'src/models'
import { BlogMenu } from '@/components'
import { ArticleStatus } from '@/common/enum/article-status'
import 'braft-editor/dist/index.css'
import './editor.less'
import { RouteComponentProps } from 'react-router-dom'
import { ClassesMenu } from './components/classes-menu'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
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
    postArticleStatus: (article: ArticleModel) => dispatch(postArticleStatusAction(article)),
    postClasses: (classes: ClassesModel) => dispatch(postClassesAction(classes)),
    delClass: (classes: ClassesModel) => dispatch(delClassAction(classes)),

})
interface Props extends RouteComponentProps {
    article: ArticleModel
    classes: ClassesModel[]
    articles: ArticleModel[]
    postArticleStatus(article: ArticleModel): void
    fetchArticle(id: string | number): void
    fetchClasses(pid: number | string, child?: number): void
    fetchArticles(classes: string | number): void
    postClasses(classes: ClassesModel): void
    delClass(classes: ClassesModel): void
}
@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class Editor extends React.Component<Props, any>{
    state: any = {
        classe: '',
        article: '',
    }
    componentWillMount() {
        const { fetchClasses, fetchArticles, fetchArticle, history } = this.props
        const { article, classe }: any = this.props.match.params
        fetchClasses(0, 1)
        if (!classe) {
            history.push(`/administrator/editor/new/_`)
        } else {
            fetchArticles(classe)
            if (article && article !== '_') {
                fetchArticle(article)
            }
        }
    }
    classesClick = ({ key }: any) => {

        const { history } = this.props
        history.push(`/administrator/editor/${key}/_`)
    }
    componentWillReceiveProps(nextProps: Props) {
        const { fetchArticles, fetchArticle, history, articles } = this.props
        const { params }: any = this.props.match
        const nextParams: any = nextProps.match.params
        const nextArticles = nextProps.articles
        if (params.classe !== nextParams.classe) {
            fetchArticles(nextParams.classe)
        } else if (nextParams.article === '_' && nextArticles.length > 0) {
            history.push(`/administrator/editor/${nextParams.classe}/${nextArticles[0].id}`)
            fetchArticle(nextArticles[0].id)
        } else if (!nextParams.article) {
            history.push(`/administrator/editor/${nextParams.classe}/_`)
        } else if (nextParams.article && nextParams.article !== '_' && nextParams.article !== params.article) {
            fetchArticle(nextParams.article)
        }
    }

    articlesItemClick = ({ key }: any) => {
        const id = key.replace('article', '')
        const { history, match }: any = this.props
        history.push(`/administrator/editor/${match.params.classe}/${id}`)
    }
    render() {
        const { classesClick } = this
        const { classes, articles, postClasses, delClass }: Props = this.props
        const { article, classe }: any = this.props.match.params
        const defaultOpenKeys = classes.map(classe => classe.id)
        return <Row className='editor'>
            <Col xs={{ span: 3 }} sm={{ span: 3 }} md={{ span: 3 }} lg={{ span: 3 }} className='editor-sidebar'>
                {
                    defaultOpenKeys.length && <ClassesMenu
                        classesClick={classesClick}
                        classe={classe}
                        defaultOpenKeys={defaultOpenKeys}
                        classes={classes}
                        postClasses={postClasses}
                        delClass={delClass}
                    />
                }
            </Col>
            <Col xs={{ span: 4 }} sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 4 }} className='editor-middle'>
                <BlogMenu onClick={this.articlesItemClick} selectedKeys={[`article${article}`]} defaultSelectedKeys={[`article${article}`]}>
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

    private getArticle(v: ArticleModel): JSX.Element {
        const { classes }: Props = this.props
        const articleMenuChange = (visible: boolean) => {
            const { history } = this.props
            const { classe }: any = this.props.match.params
            if (visible) {
                history.push(`/administrator/editor/${classe}/${v.id}`)
            }
        }

        const menuClick = ({ key }: any) => {
            console.log(key)
            const { postArticleStatus } = this.props
            switch (key) {
                case '0':
                    postArticleStatus(Object.assign(v, { status: ArticleStatus.PUBLISH }))
                    message.success('发布成功')
                    return
                case '1':
                    return
                case '2':
                    return
            }
        }

        return <BlogMenu.Item key={`article${v.id}`} data={`{'index':${v.id},'id':${v.id}}`}>
            <Dropdown trigger={['contextMenu']} onVisibleChange={articleMenuChange} overlay={(
                <Menu onClick={menuClick}>
                    <Menu.Item key={0}>发布</Menu.Item>
                    <SubMenu key={1} title={'移动'}>
                        {
                            classes && classes.map(classe => <MenuItemGroup className='a-move-menu' key={classe.id} title={classe.name}>
                                {
                                    classe.children && classe.children.map(child => <Menu.Item key={`move-${child.id}`}>{child.name}</Menu.Item>)
                                }
                            </MenuItemGroup>)
                        }
                    </SubMenu>
                    <Menu.Item key={2}>删除</Menu.Item>
                </Menu>
            )}>
                <div className='relative'>
                    <div className='menu-article-title color-4'>{v.title || '无标题'}</div>
                    <div className='menu-briefing font-5 color-5'>{v.briefing === '' || v.briefing === undefined || (v.briefing.length === 1 && v.briefing.charCodeAt(0).toString(16) === 'a') ? '无内容' : v.briefing}</div>
                    <div className='menu-date font-5 color-3'>{v.date}</div>
                </div>
            </Dropdown>
        </BlogMenu.Item>
    }
}