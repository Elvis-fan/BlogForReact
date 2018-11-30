import * as React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Menu } from 'antd'
import { Article, Clock, Skeleton } from './components'
import { classesAction } from 'src/actions'
import { articlesAction, topArticlesAction } from './actions'
import { Article as ArticleModel } from '@/models'
import './career.less'
const mapStateToProps = (state: any, ownProps: any) => {
    const { Classes, Articles } = state
    let topArticle
    let topArticles
    if (Articles.topArticles.length === 5) {
        topArticle = Articles.topArticles[0]
        topArticles = Articles.topArticles.concat().splice(1, 4)
    } else {
        topArticle = {}
        topArticles = Articles.topArticles
    }
    return ({
        classes: Classes.classes,
        mainArticles: Articles.mainArticles,
        topArticle,
        topArticles,
        loadingArticles: Articles.loadingArticles,
    })
}
const mapDispatchToProps = (dispatch: any) => ({
    fetchArticles: (payload: any) => dispatch(articlesAction(payload)),
    fetchClasses: (id: any) => dispatch(classesAction({ id })),
    fetchTopArticles: (payload: any) => dispatch(topArticlesAction(payload)),
})
interface Props {
    classes: any
    mainArticles: any
    topArticle: ArticleModel
    topArticles: ArticleModel[]
    loadingArticles: boolean
    fetchArticles({ type, page, size }: { type: number, page: number, size: number, more?: boolean }): void
    fetchClasses(id: number): void
    fetchTopArticles(pid: number): void
}
@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class Career extends React.Component<Props, any> {
    page: number = 0
    size: number = 2
    constructor(props: any) {
        super(props)
    }
    componentWillMount() {
        const { fetchArticles, fetchTopArticles, fetchClasses } = this.props
        fetchArticles({ type: 1, page: 0, size: this.size })
        fetchTopArticles(1)
        fetchClasses(1)
    }

    menuClick = ({ key }: any) => {
        const [classesId] = key.split('menu')
        this.page = 0
        this.props.fetchArticles({ type: classesId, page: this.page, size: this.size })
    }
    render() {
        const readMore = () => {
            this.props.fetchArticles({ type: 1, page: ++this.page, size: this.size, more: true })
        }
        const { menuClick } = this
        const { classes, mainArticles, loadingArticles, topArticles, topArticle } = this.props
        return <div className='career'>
            <section className='top-wrap'>
                <div className='content'>
                    <Row>
                        <Col xs={{ span: 12 }}>
                            <article>
                                <div>
                                    <h1><a href={`/career/details/${topArticle.id}`}>{topArticle.title}</a></h1>
                                </div>
                                <div className='font-6'>
                                    <span>{topArticle.author || 'MR-Liu'}   |  {topArticle.date}</span>
                                </div>
                                <div className='font-7'>
                                    {topArticle.briefing}
                                </div>

                            </article>
                        </Col>
                        <Col xs={{ span: 12 }}>
                            {
                                topArticles.map(article => (<article>
                                    <div>
                                        <h1><a href={`/career/details/${article.id}`}>{article.title}</a></h1>
                                    </div>
                                    <div className='font-6'>
                                        <span>{article.author || 'MR-Liu'}   |  {article.date}</span>
                                    </div>
                                </article>))
                            }
                        </Col>
                    </Row>
                </div>
            </section>
            <section className='main-wrap'>
                <div className='content'>
                    <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 14 }} md={{ span: 16 }}>
                            {
                                mainArticles && mainArticles.map((article: any, index: number) => <Article key={index} item={article} />)
                            }
                            <Skeleton loading={loadingArticles} />
                            {
                                !loadingArticles && <div className='font-3 read-more pointer' onClick={readMore}>阅读更多</div>
                            }
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 2 }} className='career-menu'>
                            <summary className='title font-3'>
                                生涯<Clock />
                            </summary>
                            <menu>
                                <Menu onClick={menuClick} mode='inline' defaultSelectedKeys={['1menu']} className='left'>
                                    <Menu.Item key={'1menu'} className='left'>全部</Menu.Item>
                                    {
                                        classes && classes.map((classe: any) => <Menu.Item key={`${classe.id}menu`} className='left'>{classe.name}</Menu.Item>)
                                    }
                                </Menu>
                            </menu>

                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    }
}