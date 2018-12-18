import * as React from 'react'
import { Menu, Row, Col, Dropdown, Icon, Button } from 'antd'
import BlogEditor from 'src/components/editor'
import { connect } from 'react-redux'
import {Dispatch} from 'redux'
import { classesAction, articlesAction, articleAction, postArticleAction, postClassesAction, delClassAction } from 'src/actions'
import { Classes as ClassesModel, Article as ArticleModel } from 'src/models'
import { BlogMenu } from '@/components'
import { ArticleStatus } from '@/common/enum/article-status'
import { IconFont } from '@/components'
import './editor.less'
import { RouteComponentProps } from 'react-router-dom'
import { ClassesMenu } from './components/classes-menu'
import { ARTICLES_ACTION } from 'src/common/config/articles-action'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const mapStateToProps = (state: any, ownProps: any) => {
    const { Classes, Articles } = state
    return {
    
        classes: Classes.classes,
        articles: Articles.mainArticles,
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchClasses: (id: string, child: number = 0) => dispatch(classesAction({ id, child })),
    fetchArticles: (classes: string | number) => dispatch(articlesAction({ type: classes, page: 0, size: 9999 })),
    fetchArticle: (id: string | number) => dispatch(articleAction(id)),
    postArticle: (article: ArticleModel, action: string) => dispatch(postArticleAction(article, action)),
    postClasses: (classes: ClassesModel) => dispatch(postClassesAction(classes)),
    delClass: (classes: ClassesModel) => dispatch(delClassAction(classes)),

})
interface Props extends RouteComponentProps {
    article: ArticleModel
    classes: ClassesModel[]
    articles: ArticleModel[],
    postArticle(article: ArticleModel, action: string): void
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
            if (article && ['_', 'new'].indexOf(article) === -1) {
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
        if (!nextParams.article) {
            history.push(`/administrator/editor/${nextParams.classe}/_`)
        } else if (params.classe !== nextParams.classe) {
            fetchArticles(nextParams.classe)
        } else if (nextParams.article === 'new' && nextArticles.length > 0) {
            if (nextArticles.length !== articles.length) {
                console.log(nextArticles, articles)
                history.push(`/administrator/editor/${nextParams.classe}/${nextArticles[0].id}`)
            }
        } else if (nextParams.article && nextParams.article !== '_' && nextParams.article !== params.article) {
            fetchArticle(nextParams.article)
        } else if (nextParams.article === '_' && nextArticles.length > 0) {
            if (nextArticles !== articles) {
                history.push(`/administrator/editor/${nextParams.classe}/${nextArticles[0].id}`)
            }
        }
    }

    articlesItemClick = ({ key }: any) => {
        const id = key.replace('article', '')
        const { history, match }: any = this.props
        history.push(`/administrator/editor/${match.params.classe}/${id}`)
    }
    addArticle = () => {
        const { postArticle } = this.props
        const { classe }: any = this.props.match.params
        const { history }: any = this.props

        postArticle({
            id: '',
            class: classe,
            status: ArticleStatus.DRAFT,
            title: '',
            author: '',
            cover: '',
            images: [],
            date: new Date().toJSON(),
            briefing: '',
            content: '',
        }, '')
        history.push(`/administrator/editor/${classe}/new`)
    }
    render() {
        const { classesClick, addArticle } = this
        const { classes, articles, postClasses, delClass }: Props = this.props
        const { article, classe }: any = this.props.match.params
        const defaultOpenKeys = classes.map(classe => classe.id)
        return <Row className='editor'>
            <Col xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 2 }} className='editor-sidebar'>
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
            <Col xs={{ span: 3 }} sm={{ span: 3 }} md={{ span: 3 }} lg={{ span: 3 }} className='editor-middle'>
                <div className='a-e-a-nav pointer'>
                    <span className='font-6 link' onClick={addArticle}><Icon type='file-add' />新增</span>
                </div>

                <BlogMenu onClick={this.articlesItemClick} selectedKeys={[`article${article}`]} defaultSelectedKeys={[`article${article}`]}>
                    {
                        articles && articles.map(v => this.getArticle(v))
                    }
                </BlogMenu>
            </Col>
            <Col xs={{ span: 19 }} sm={{ span: 19 }} md={{ span: 19 }} lg={{ span: 19 }} className='editor-viewport'>
                <BlogEditor />
            </Col>
        </Row >
    }

    private getArticle(v: ArticleModel): JSX.Element {
        const { classes }: Props = this.props
        const { classe }: any = this.props.match.params
        const articleMenuChange = (visible: boolean) => {
            const { history } = this.props

            if (visible) {
                history.push(`/administrator/editor/${classe}/${v.id}`)
            }
        }

        const menuClick = ({ key, domEvent }: any) => {
            domEvent.stopPropagation()
            const { postArticle, history } = this.props
            if (key.indexOf('move-') !== -1) {
                key.replace('move-', '')
                postArticle(Object.assign({}, v, { class: key.replace('move-', '') }), ARTICLES_ACTION.MOVE)
                const { classe }: any = this.props.match.params
                history.push(`/administrator/editor/${classe}/_`)
            } else {
                switch (key) {
                    case '0':
                        postArticle(Object.assign(v, { status: ArticleStatus.PUBLISH }), ARTICLES_ACTION.PUBLISH)
                        return
                    case '2':
                        postArticle(Object.assign(v, { status: ArticleStatus.REMOVE }), ARTICLES_ACTION.REMOVE)
                        history.push(`/administrator/editor/${classe}`)
                        return
                }
            }

        }

        return <BlogMenu.Item key={`article${v.id}`} data={`{'index':${v.id},'id':${v.id}}`}>
            <Dropdown trigger={['contextMenu']} onVisibleChange={articleMenuChange} overlay={(
                <Menu onClick={menuClick}>
                    <Menu.Item key={0}><IconFont type='blog-icon-shuangchuang_fabu' />发布</Menu.Item>
                    <SubMenu key={1} title={<span><Icon type='folder-open' />移动</span>}>
                        {
                            classes && classes.map(clas => <MenuItemGroup className='a-move-menu' key={clas.id} title={clas.name}>
                                {
                                    clas.children && clas.children.map((child: any) => classe === child.id ? '' : <Menu.Item key={`move-${child.id}`}>{child.name}</Menu.Item>)
                                }
                            </MenuItemGroup>)
                        }
                    </SubMenu>
                    <Menu.Item key={2}><Icon type='delete' />删除</Menu.Item>
                </Menu>
            )}>
                <div className='relative a-e-a-m-item'>
                    <div>
                        <Icon type={v.status === ArticleStatus.PUBLISH ? 'file-done' : 'file-text'} className='font-1' />
                    </div>
                    <div className='a-e-a-m-content'>
                        <div className='menu-article-title font-5 color-4'>{v.title || '无标题'}</div>
                        <div className='font-7 a-e-a-m-content color-5'>{v.briefing === '' || v.briefing === undefined || (v.briefing.length === 1 && v.briefing.charCodeAt(0).toString(16) === 'a') ? '无内容' : v.briefing}</div>
                        <div className='menu-date font-7 color-3'>{v.date}</div>
                    </div>
                </div>
            </Dropdown>
        </BlogMenu.Item>
    }
}