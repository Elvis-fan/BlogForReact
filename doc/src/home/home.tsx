import * as React from 'react';
import './home.css';
import { DatePicker } from  'antd';
import * as actions from './../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import 'antd/dist/antd.css';
// import { Link } from 'react-router-dom';
const logo = require('./../logo.svg');

export interface HomeProps { }
export interface HomeState {
    list: any ;
}
export class Home extends React.Component<{}, {}> {
    public state: HomeState;
    public account: string;

    constructor (props: HomeProps) {
        super (props);
        this.state = {list : []};

    }

    render() {

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>

                <DatePicker/>
            </div>

        );
    }
}
const mapDispatchToProps: any = (dispatch: any) => {

    return {
        actions: bindActionCreators(actions.SignAction, dispatch),
    };
}
export default connect(
    undefined,
    mapDispatchToProps
)(Home);