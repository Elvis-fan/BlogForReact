import * as React from 'react'
import { Button } from 'antd'
import { articleSkeleton } from './article'
export const Skeleton = ({ loading, children }: { loading?: boolean, children?: any }) => {
  return <div>
    {loading ? articleSkeleton() : children}</div>
}
