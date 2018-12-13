
import * as React from 'react'
import { Row, Col, Menu, Icon } from 'antd'
import { Link,withRouter } from 'react-router-dom'
import { SearchInput } from 'src/components'
import { connect } from 'react-redux'
import logo from 'src/static/img/logo.png'

import { ON_CURTAIN, OFF_CURTAIN } from 'src/components/global/curtain/action-types'
import { curtainAction } from 'src/components/global/curtain/action'
import { CLOSE_NAV_BAR, OPEN_NAV_BAR } from './action-types'
import './nav-bar.less'

const CMenus = [
    {
        label: '远行',
        link: '/111'
    }, {
        label: '随笔',
        link: '/222'
    }, {
        label: '生涯',
        link: '/career'
    }, {
        label: '关于',
        link: '/about'
    }, {
        label: '杂项',
        link: '/'
    },
]
const NavBarMenus = ({ menus, mode, style, selected, onClick, itemClass }:
    {
        menus: Array<{}>, mode?: 'inline' | 'horizontal' | 'vertical' | 'vertical-left' | 'vertical-right' | undefined,
        style?: {}, selected: string,
        onClick?: any,
        itemClass?: string
    }) => {

    return <Menu onClick={onClick || (() => { })} mode={mode || 'horizontal'}
        selectedKeys={[selected]} className='right menu'
        style={style}>
        {menus.map((menu: any) => <Menu.Item className={itemClass || ''} key={menu.link}><Link to={menu.link}>{menu.label}</Link></Menu.Item>)}
    </Menu>

}

const mapStateToProps = (state: any, ownProps: any) => {
  
    return ({
        state: state.navBar.state,
        path: state.routerReducer.payload.pathname
    })
}

const mapDispatchToProps = (dispatch: any) => ({
    toggleCurtain: (id: string, action: string, callback: string) => {
        dispatch(curtainAction(id, callback))
        dispatch(curtainAction(action, id))
    }
})

interface NavBarProps {
    toggleCurtain: (id: string, action: string, callback?: string) => {},
    state: boolean,
    path: string
}


 class NavBar extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    toggleCollapsed = () => {
        const { state } = this.props
        if (state) {
            this.props.toggleCurtain(OFF_CURTAIN, CLOSE_NAV_BAR)
        } else {
            this.props.toggleCurtain(ON_CURTAIN, OPEN_NAV_BAR, CLOSE_NAV_BAR)
        }
    }
    public render() {
        const { state, path } = this.props
        let selected=path
        for(let menu of CMenus){
            if(menu.link.indexOf(path.split('/')[1])!==-1){
                selected=menu.link
            }
        }
        const close = () => {
            setTimeout(() => {
                this.props.toggleCurtain(OFF_CURTAIN, CLOSE_NAV_BAR)
            }, 250)
        }
        return <header className='header text-center'>
            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }}>
                    <Link to='/'>
                        <img src={logo} className='logo' alt='logo' />
                    </Link>
                </Col>
                <Col xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 6 }}>
                    {/* <SearchInput placeholder='搜索你感兴趣的内容...' className='scroll' style={{ width: 200 }} /> */}
                </Col>
                <Col xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 13 }}>
                    <NavBarMenus menus={CMenus} selected={selected} />
                </Col>
                <Col className='nav-btn' xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 0 }}>
                    <Icon type={state ? 'menu-unfold' : 'menu-fold'} className={state ? 'active font-3' : ' font-3'} onClick={this.toggleCollapsed} style={{ verticalAlign: 'middle' }} />
                </Col>
            </Row>
            <div className={`mobile-nav ${state ? 'show' : ''}`}>
                <NavBarMenus onClick={close} menus={CMenus} selected={selected} mode={'inline'} itemClass='left' />
            </div>

        </header>
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar))