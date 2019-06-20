import React, { CSSProperties } from 'react'
import classnames from 'classnames'
import DropDownItem from './DropDownItem'
import './style.less'
export type DropDownProp = {
  overlay: JSX.Element
  overlayClass?: string
}

export default class DropDown extends React.PureComponent<DropDownProp> {
  static Item = DropDownItem
  ref: React.RefObject<HTMLDivElement> = null

  state: {
    show: boolean
  } = {
    show: false
  }

  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  componentDidMount() {
    document.body.addEventListener('click', this.bodyClickHandler)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.bodyClickHandler)
  }

  bodyClickHandler = e => {
    const { target } = e
    const { current } = this.ref
    if (current && !current.contains(target)) {
      this.setState({
        show: false
      })
    }
  }

  toggle = e => {
    setTimeout(() => {
      this.setState({
        show: !this.state.show
      })
    })
  }

  render() {
    const { show } = this.state
    const { children, overlay, overlayClass } = this.props
    const precls = 'dropdown-overlay'
    const clazz = precls + (show ? '-show' : '-hide')
    return (
      <div className='dropdown'>
        <div ref={this.ref} onClick={this.toggle}>
          {typeof children === 'function' ? children(show) : children}
        </div>
        <div className={classnames(precls, clazz, overlayClass)}>{overlay}</div>
      </div>
    )
  }
}
