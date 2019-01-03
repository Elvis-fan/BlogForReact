import * as React from 'react'
import { connect } from 'react-redux'
import { curtainAction } from './action'
import { ON_CURTAIN, OFF_CURTAIN } from './action-types'
import './curtain.less'
const mapStateToProps = (state: any) => {
    return {
        isVisible: state.curtain.type === ON_CURTAIN,
        action: state.curtain.action
    }
}
const mapDispatchToProps = (dispatch: any) => ({
    close: (id: string, action: string) => {
        dispatch(curtainAction(id, action))
        dispatch(curtainAction(action, id))
    }
})

const Curtain=({close,action,isVisible}:any)=>{
    const clean=()=>close(OFF_CURTAIN, action)
    // if(isVisible){
    //     document.body.style.overflow='hidden'
    // }else{
    //     document.body.style.overflow=''
    // }
 
    return <div onClick={clean} className={`curtain ${isVisible ? '' : 'vis-h bg-tr'}`} />
}
export default connect(mapStateToProps, mapDispatchToProps)(Curtain)
// @(connect(mapStateToProps, mapDispatchToProps) as any)
// export default class Curtain extends React.Component<any, any> {
//     constructor(props: any) {
//         super(props)

//     }
//     close = () => {
//         this.props.close(OFF_CURTAIN, this.props.action)
//     }
//     render() {
//         const { isVisible, close } = this.props
//         return <div onClick={this.close} className={`curtain ${isVisible ? '' : 'vis-h bg-tr'}`} />
//     }
// }