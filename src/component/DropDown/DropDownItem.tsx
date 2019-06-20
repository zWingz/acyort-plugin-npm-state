import React, { HTMLAttributes } from 'react'
import classnames from 'classnames'

interface DropDownItemProp extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  className?: string
  children?: React.ReactNode
}

export default function DrapDownItem(props: DropDownItemProp) {
  const { className, children, ...rst } = props
  return <div className={classnames('dropdown-item', className)} {...rst}>
    {children}
  </div>
}
