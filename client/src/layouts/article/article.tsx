import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router-dom'
import { articleAction } from 'src/actions'
import { Anchor, Row, Col, Dropdown, Icon, Button } from 'antd'
import { Classes as ClassesModel, Article as ArticleModel } from 'src/models'
const { Link } = Anchor
const mapStateToProps = (state: any) => {
  const { article } = state.Articles
  return {
    article
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchArticle: (id: string | number) => dispatch(articleAction(id))
  }
}

interface Props extends RouteComponentProps {
  title: string;
  article:ArticleModel
  fetchArticle(id: string | number): void;
}

@(connect(
  mapStateToProps,
  mapDispatchToProps
) as any)
export default class Article extends React.Component<Props, any> {
  componentWillMount() {
    const { match, fetchArticle } = this.props
    const { id }: any = match.params
    fetchArticle(id)
  }
  render() {
    const {article}=this.props
    console.log(article)
    let list = article.content.match(/<h[1-6]{1}\sid=[^>]*>(.*?)<\/h[1-6]{1}>/ig)||[]
    let arr= []
    console.log(list)
    for(let li of list){
        let indentation = li.slice(li.indexOf('id="')+4,li.indexOf('" '))
        let lis = li.match(/<\s*\/?\s*[a-zA-z_]([^>]*?["][^"]*["])*[^>"]*>/ig)
        console.log(lis)
        arr.push([indentation, 'lis'])
    }
    return (
      <div>
        <section className='main-post-wrap'>
          <div className='career-content'>
            <Row>
              <Col xs={{ span: 24 }} sm={{ span: 14 }} md={{ span: 16 }}>
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
                  </div>
                  <div
                    className='main-post__cont'
                    dangerouslySetInnerHTML={{
                      __html: article.content
                        .replace(/<\/script/g, '<\\/script')
                        .replace(/<!--/g, '<\\!--')
                    }}
                  />
                </article>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 8, offset: 2 }}
                md={{ span: 6, offset: 2 }}
              >
                <aside>
                  <Anchor offsetTop={80} className='aside font-2'>
                    {arr.map((n, i) => (
                      <Link key={n[0]} href={`#${n[0]}`} title={n[1]} />
                    ))}
                  </Anchor>
                </aside>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    )
  }
}
