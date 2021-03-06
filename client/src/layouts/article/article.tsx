import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router-dom'
import { articleAction } from 'src/actions'
import {  Row, Col, Button } from 'antd'
import MobileAnchor from './components/mobile-anchor'
import {  Article as ArticleModel } from 'src/models'
import { MarkView } from '@/components/mark-view'
import './article.less'
const mapStateToProps = (state: any) => {
  const { article } = state.Articles
  return {
    article,
    isMobile: state.isMobile.isMobile,
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchArticle: (id: string | number) => dispatch(articleAction(id)),
  }
}

interface Props extends RouteComponentProps {
  title: string;
  article: ArticleModel;
  fetchArticle(id: string | number): void;
}

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class Article extends React.Component<Props, any> {
  componentWillMount() {
    const { match, fetchArticle } = this.props
    const { id }: any = match.params
    fetchArticle(id)
  }
  render() {
    const { article } = this.props

    return (
      <div className='font-6'>
        <section className='main-post-wrap'>
          <div className='content'>
            <Row>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
                <article className='main-post'>
                  <div className='main-post__img'>
                    {/* <img
                      src={`http://106.14.150.87/static/image/${article.id}.jpg`}
                      alt=''
                    /> */}
                  </div>
                  <div className='main-post__title-wrap'>
                    <div>
                      <h2>
                        <a href={'/career/details/'}>{article.title}</a>
                      </h2>
                    </div>
                    <div>
                      <span>MR-Liu | {article.date}</span>
                    </div>
                    <MarkView text={article.content} anchorable={1} />
                  </div>
                </article>
              </Col>
              <Col className='qweqweqwq' xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 6, offset: 2 }} >
              
                <MarkView.Anchor />
              </Col>
            </Row>
          </div>
        </section>
        <MobileAnchor anchor={MarkView.Anchor} />
      </div>
    )
  }
}
