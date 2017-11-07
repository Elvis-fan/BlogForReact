import * as React from 'react';
// import Home from './../home/home';

const logo = require('./../logo.svg');

export interface AppProps { }
export interface AppState {
    list: any ;
}
export class App extends React.Component<{}, {}> {
    public state: AppState;
    public account: string;

    constructor (props: AppProps) {
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

            </div>

        );
    }
}

export default App;