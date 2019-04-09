import React from "react";
import "./blog.less";
import { Query, MutationFn } from "react-apollo";
import gql from "graphql-tag";
export default class Blog extends React.Component<any, any> {
  render() {
    return (
      <div className="blog">
        <div className="container">
          <div className="head">
            <div className="index">index</div>
            <div className="title">title</div>
            <div className="remake">remake</div>
          </div>
          <Query
            query={gql`
              {
                articles(page: 0, size: 4, category: "1") {
                  author
                  briefing
                  date
                  id
                  title
                }
              }
            `}
          >
            {({ loading, error, data }: any) => {
              if (loading) return 'Loading...'
              if (error) return `Error!`
              if(data){console.log(data)}
              return data.articles&&data.articles.map((article: any,index: number)=><div key={index} className="article-row">
                    <div className="index">{index}</div>
                    <div className="title">{article.title}</div>
                    <div className="remake">+</div>
              </div>)
            }}
          </Query>
        </div>
      </div>
    );
  }
}
