import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { Anchor, Row, Col } from 'antd';
import PropTypes from 'prop-types';
const { Link } = Anchor;
import { matchPath } from 'react-router-dom';
import { URL } from './../components/config';

class Details extends React.Component {
    state = {
        article:[]
    }
    static defaultProps = {
        getArticleURL : 'article/getArticle/'
    }
    constructor ( props ) {
        super(props);

        let id = matchPath(location.pathname,'/career/details/:id',true).params.id;

        this.getArticle(id, (data) => {
            this.setState({article: data});
        });

    }
    getArticle = (id, callback) => {
        return fetch(  `${URL}${this.props.getArticleURL}${id}` ).then(response => response.json())
            .then(data => callback(data))
            // .catch(e => console.log('Oops, error', e));
    }
    render() {
        const details = this.state.article.map((n, i) => {

            function getPath(map, id, path){
                let arr=[];
                if(!path) path=[];
                if(!id) return map;
                let keys = [...map.keys()];

                for(let i of keys){

                    if(i===id) {
                        path.push(i);
                        arr=[map,path];

                    }
                    else{
                        path.push(i);
                        arr=getPath(map.get(i),id, path);
                    }
                }

                return arr;
            }
            function formatId(str) {
                return str.substring(1,str.length-2)
            }

            let list = n.content.match(/<h[1-6]{1}\sid=[^>]*>([^<]*)/ig);
            let arr= [];
            for(let i =0;i<list.length;i++){

                let indentation = list[i].slice(list[i].indexOf('id="')+4,list[i].indexOf('" '));
                let title = list[i].split(/\sid=[^>]*>/ig)[1];

                arr.push([indentation, title]);
            }
            console.log(arr);

            return (
                <Row key={i}>
                    <Col xs={{span: 24}} sm={{span: 14}} md={{span: 16}}>
                        <article className="main-post">
                            <div className="main-post__img">
                                <img src={`http://106.14.150.87/static/image/${n.id}.jpg`} alt=""/>
                            </div>
                            <div className="main-post__title-wrap">
                                <div>
                                    <h2><a href={'/career/details/'}>{n.title}</a></h2>
                                </div>
                                <div>
                                    <span>MR-Liu   |  {n.date}</span>
                                </div>
                            </div>
                            <div className="main-post__cont" dangerouslySetInnerHTML={{__html: n.content.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')}}/>
                        </article>
                    </Col>
                    <Col xs={{span: 24}} sm={{span: 8, offset: 2}} md={{span: 6, offset: 2}}>
                        <aside>
                            <Anchor offsetTop={80} className="aside font-2">
                                {
                                    arr.map((n, i) =>
                                        <Link key={n[0]} href={`#${n[0]}`} title={n[1]} />
                                    )
                                }
                            </Anchor>
                        </aside>
                    </Col>
                </Row>
            )
        });
        return (
            <div>
                <section className="main-post-wrap">
                    <div className="career-content">
                        {details}
                    </div>
                </section>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators(actions.SignAction, dispatch),
    };
};
export default connect(
    undefined,
    mapDispatchToProps
)(Details);