import * as React from 'react';
import { Link } from 'react-router-dom';
class Error extends React.Component {
    render() {
        return (
            <div>
                <h1>404</h1>
                <Link to='/'>Goto Home</Link>
            </div>
        );
    }
}
export default Error;