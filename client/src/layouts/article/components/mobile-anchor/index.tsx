import React, { useState } from 'react'
import { Icon } from '@/components/icon'
import { connect } from 'react-redux'
import './mobile-anchor.less'
import { ON_CURTAIN, OFF_CURTAIN } from 'src/components/global/curtain/action-types'
import {CLOSE_MOBILE_ANCHOR,OPEN_MOBILE_ANCHOR,OPENING_MOBILE_ANCHOR} from './action-types'
import { curtainAction } from 'src/components/global/curtain/action'
const mapStateToProps = (state: any, ownProps: any) => {

    return ({
        state: state.MobileAnchor.state
    })
}

const mapDispatchToProps = (dispatch: any) => ({
    opening:()=>dispatch({type:OPENING_MOBILE_ANCHOR}),
    toggleCurtain: (id: string, action: string, callback: string) => {
        dispatch(curtainAction(id, callback))
        dispatch(curtainAction(action, id))
    }
})
interface Props {
    state: number
    children:any
    toggleCurtain: (id: string, action: string, callback?: string) => {}
    opening(id:any):any
    
}
const MobileAnchor = (props: Props&any) => {
 
  const {children,state,toggleCurtain,opening}=props
  const toggleCollapsed = (num:number) => {

    if (num===2) {
       toggleCurtain(OFF_CURTAIN, CLOSE_MOBILE_ANCHOR)
    } else if(num===1) {
        toggleCurtain(ON_CURTAIN, OPEN_MOBILE_ANCHOR, CLOSE_MOBILE_ANCHOR)
    }else if(num===0){
        opening()
    }
}
  return (
    <div>
      <div
        className={`m-article-directory-btn ${state !== 0 ? 'active' : ''}`}
        onClick={() => toggleCollapsed(1)}
        onDoubleClick={() => toggleCollapsed(1)}
      >
        <Icon type='blog-icon-article-directory' className='font-4' />
      </div>
      <div className={`m-anchor ${state === 2 ? 'active' : ''}`}>
        <div className='m-anchor-close'>
          <Icon type='close' onClick={() => toggleCollapsed(2)} />
        </div>
        <div onClick={() => toggleCollapsed(2)}>
            {children}
        </div>
        
      </div>
    </div>
  )
}
export default connect(mapStateToProps,mapDispatchToProps)(MobileAnchor)