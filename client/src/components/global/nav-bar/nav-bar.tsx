import * as React from 'react'
import { Row, Col, Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { enquireScreen } from 'enquire-js'
import logo from 'src/static/img/logo.png'
import MobileMenu from 'rc-drawer'
import { curtainAction } from 'src/components/global/curtain/action'
import './nav-bar.less'
import 'rc-drawer/dist/rc-drawer.css'
const CMenus = [
  {
    label: '远行',
    link: '/111',
  },
  {
    label: '随笔',
    link: '/222',
  },
  {
    label: '生涯',
    link: '/career',
  },
  {
    label: '关于',
    link: '/about',
  },
  {
    label: '杂项',
    link: '/',
  },
]
const NavBarMenus = ({
  menus,
  mode,
  style,
  selected,
  onClick,
  itemClass,
}: {
  menus: Array<{}>;
  mode?:
    | 'inline'
    | 'horizontal'
    | 'vertical'
    | 'vertical-left'
    | 'vertical-right'
    | undefined;
  style?: {};
  selected: string;
  onClick?: any;
  itemClass?: string;
}) => {
  return (
    <Menu
      onClick={onClick || (() => {})}
      mode={mode || 'horizontal'}
      selectedKeys={[selected]}
      className='right menu'
      style={style}
    >
      {menus.map((menu: any) => (
        <Menu.Item className={itemClass || ''} key={menu.link}>
          <Link to={menu.link}>{menu.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    state: state.navBar.state,
    path: state.routerReducer.payload.pathname,
    isMobile: state.isMobile.isMobile,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  toggleCurtain: (id: string, action: string, callback: string) => {
    dispatch(curtainAction(id, callback))
    dispatch(curtainAction(action, id))
  },
})

interface NavBarProps {
  toggleCurtain: (id: string, action: string, callback?: string) => {};
  state: boolean;
  path: string;
}

class NavBar extends React.Component<any, any> {
  scrollTop: number
  state = {
    hide: false,
    visible: false,
  }
  header: any
  componentDidMount() {
    document.addEventListener('scroll', this.onScroll)
  }

  toggleCollapsed = () => {
    this.setState({ visible: !this.state.visible })
  }
  onScroll = (e: any) => {
    const {isMobile} = this.props
    if (!isMobile) {
      if (this.state.hide) {
        this.setState({ hide: false })
      }
      return
    }
    let scrollTop =
      (document.documentElement as any).scrollTop || document.body.scrollTop
    if (this.scrollTop > scrollTop) {
      if (this.state.hide) {
        this.setState({ hide: false })
      }
    } else {
      if (!this.state.hide) {
        this.setState({ hide: true })
      }
    }
    this.scrollTop = scrollTop
  }
  public render() {
    const { hide, visible } = this.state
    const { path } = this.props
    let selected = path
    for (let menu of CMenus) {
      if (menu.link.indexOf(path.split('/')[1]) !== -1) {
        selected = menu.link
      }
    }
    return (
      <header
        className={`header text-center ${hide ? 'hide' : ''}`}
        ref={dom => (this.header = dom)}
      >
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
          <Col
            className='nav-btn'
            xs={{ span: 2 }}
            sm={{ span: 2 }}
            md={{ span: 0 }}
          >
            <Icon
              type={visible ? 'menu-unfold' : 'menu-fold'}
              className={visible ? 'active font-5' : ' font-5'}
              onClick={this.toggleCollapsed}
              style={{ verticalAlign: 'middle' }}
            />
          </Col>
        </Row>
        <MobileMenu
          handler={<div />}
          key='Mobile-menu'
          placement='right'
          width='70%'
          open={visible}
          wrapperClassName='m-blog-nav-drawer'
          onHandleClick={this.toggleCollapsed}
          onMaskClick={this.toggleCollapsed}
        >
          <div className='m-nav-logo'>
            <Link to='/'>
              <img src={logo} className='logo' alt='logo' />
            </Link>
          </div>
          <NavBarMenus
            onClick={this.toggleCollapsed}
            menus={CMenus}
            selected={selected}
            mode={'inline'}
            itemClass='left'
          />
        </MobileMenu>
      </header>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(NavBar as any))
