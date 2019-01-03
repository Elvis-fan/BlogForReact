import React, { useState } from 'react'
import { Icon } from '@/components/icon'
import MobileMenu from 'rc-drawer'
import 'rc-drawer/dist/rc-drawer.css'
import './mobile-anchor.less'

interface Props {
    children:any
}
const MobileAnchor = (props: Props&any) => {
 
 
  const  [state,setState] =useState(false)
  const {anchor}=props
  const Anchor= anchor
  const sState=()=>setState(!state)
  return (
    <MobileMenu
    // handler={<div className='drawer-handle'><Icon type='blog-icon-article-directory' className='font-4' /></div>}
          iconChild={[<Icon key={'menu-unfold'} type='blog-icon-article-directory' />, <Icon key={'menu-fold'} type='blog-icon-article-directory' />]}
          key='Mobile-menu'
          placement='right'
          width='70%'
          open={state}
          wrapperClassName='m-blog-drawer-wrapper'
          onHandleClick={sState}
          onMaskClick={sState}
        >
        <Anchor onClick={sState}/>
        </MobileMenu>
  )
}
export default MobileAnchor