import * as React from 'react'
import Editor from './editor/editor'
import { connect } from 'react-redux'
const mapStateToProps = (state: any, ownProps: any) => {
    return {}
}
const mapDispatchToProps = (dispatch: any) => ({
    
})
@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class Administrator extends React.Component<any, any>{
    render() {
        return <div>
            <Editor />
        </div>
    }
}