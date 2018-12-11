import React, { useState } from 'react'
import { Menu, Icon, Row, Col, Dropdown, message, Input } from 'antd'
import { Classes as ClassesModel, Article as ArticleModel } from 'src/models'
export const ClassesMenu = ({ classesClick, classe, defaultOpenKeys, classes, postClasses, delClass }: any) => {
  const [add, setAdd] = useState({})
  const [ivalue, setValue] = useState('')
  return <Menu
    onClick={classesClick}
    defaultSelectedKeys={[classe]}
    defaultOpenKeys={defaultOpenKeys}
    mode='inline'>
    <Menu.Item className='left' key={'new'}>最新</Menu.Item>
    {
      classes && classes.map((value: any) => SubClasses(value, add[value.id], setAdd, ivalue, setValue, postClasses, delClass))
    }

  </Menu>
}
const SubClasses = (value: ClassesModel, addShow: any, setAdd: any, ivalue: any, setValue: any, postClasses: any, delClass: any): JSX.Element => {
  const save = () => {
    postClasses({
      name: ivalue,
      pid: value.id,
    })
    setValue('')
    setAdd({ [value.id]: false })
  }
  const change = ({ target }: any) => {
    setValue(target.value)
  }
  const onBlur = () => {
    if (ivalue) {
      save()
    } else {
      setValue('')
      setAdd({ [value.id]: false })
    }
  }
  return <Menu.SubMenu key={value.id} title={value.name}>
    {value.children && value.children.map(v1 => <Menu.Item key={v1.id} className='left'>
      <ClasseItem v1={v1} setAdd={() => setAdd({ [value.id]: true })} postClasses={postClasses} delClass={delClass} />
    </Menu.Item>)}
    {
      addShow && <Menu.Item disabled={true}><Input value={ivalue} onBlur={onBlur} onChange={change} autoFocus={addShow} onPressEnter={save} id={`addmenu${value.id}`} /></Menu.Item>
    }
  </Menu.SubMenu>
}

const ClasseItem = ({ v1, setAdd, postClasses, delClass }: { v1: ClassesModel, setAdd: any, postClasses: any, delClass: any }): JSX.Element => {
  const [isEdit, setIsEdit] = useState(false)
  const [name, setName] = useState(v1.name)
  const menuClick = ({ domEvent, key }: any) => {
    domEvent.stopPropagation()
    switch (key) {
      case '0':
        setAdd()
        return
      case '1':
        setIsEdit(true)
        return
      case '2':
        delClass(v1)
        return
    }
  }
  const save = (event: any) => {
    if (event.keyCode === 13 && name !== '') {
      setIsEdit(false)
      postClasses({ ...v1, name })
    }
  }
  const change = ({ target }: any) => {
    setName(target.value)
  }
  const blur = () => {
    if (name !== '') {
      setIsEdit(false)
      postClasses({ ...v1, name })
    }

  }
  return <Dropdown trigger={['contextMenu']} overlay={(
    <Menu onClick={menuClick}>
      <Menu.Item key={0}><Icon type='folder-add' />新建</Menu.Item>
      <Menu.Item key={1}><Icon type='edit' />重命名</Menu.Item>
      <Menu.Item key={2}><Icon type='delete' />删除</Menu.Item>
    </Menu>)}>
    <div className='menu-item' >{
      isEdit
        ? <Input value={name} onBlur={blur} onChange={change} autoFocus={isEdit} onPressEnter={save} />
        : name
    }</div>
  </Dropdown>
}