
import { Icon as Aicon } from 'antd'
import { ALI_ICON } from 'src/common/config'
import React from 'react'
export const IconFont = Aicon.createFromIconfontCN({
  scriptUrl: ALI_ICON
})
export const Icon =(props:any)=>{
  if(props.type.indexOf('blog-icon')!==-1){
    return <IconFont {...props} />
  }
  return  <Aicon {...props} />
}