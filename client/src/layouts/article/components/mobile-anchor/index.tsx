import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Icon } from '@/components/icon'
import MobileMenu from 'rc-drawer'
import 'rc-drawer/dist/rc-drawer.css'
import './mobile-anchor.less'

import { Anchor } from 'antd'

const { Link } = Anchor

interface Props {
  children: any
}
const MobileAnchor = (props: Props & any) => {
  const [state, setState] = useState(false)
  const { anchor, isMobile } = props
  // const Anchor = anchor
  console.log()
  const sState = () => setState(!state)
  return (
    <MobileMenu
      // handler={<div className='drawer-handle'><Icon type='blog-icon-article-directory' className='font-4' /></div>}
      iconChild={[<Icon key={'menu-unfold'} type='blog-icon-article-directory' />, <Icon key={'menu-fold'} type='blog-icon-article-directory' />]}
      className={isMobile ? '' : 'none'}
      key='Mobile-menu'
      placement='right'
      width='70%'
      open={state}
      wrapperClassName='m-blog-drawer-wrapper'
      onHandleClick={sState}
      onMaskClick={sState}
    >
      <Anchor onClick={sState}>
        {
          anchor(sState).props.children
        }
      </Anchor>
    </MobileMenu>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isMobile: state.isMobile.isMobile
  }
}

export default connect(mapStateToProps)(MobileAnchor)