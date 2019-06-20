import React, { CSSProperties } from 'react'
import PropTypes from 'prop-types'
import DropDown from '../DropDown'
import cls from 'classnames'
import './style.less'
const { Item } = DropDown
export type CommonSelectProp = {
  all?: boolean
  allLabel?: string
  placeholder?: string
  options: Array<SelectOptionsProp>
  value?: any
  onChange?: Function
  style?: CSSProperties
  className?: string
}

export type SelectOptionsProp = {
  name: string
  value: any
}

export default class CommonSelect extends React.PureComponent<
  CommonSelectProp
> {
  static propTypes = {
    all: PropTypes.bool,
    allLabel: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func
  }

  static defaultProps = {
    all: true,
    allLabel: 'All'
  }

  state: {
    options: Array<SelectOptionsProp>
  }

  constructor(props) {
    super(props)
    this.state = {
      options: this.formatOptions()
    }
  }

  getSelected(val, options) {
    const res = options.filter(each => each.value === val)[0]
    return res ? res.name : ''
  }

  handleClick(each) {
    this.props.onChange(each.value)
  }

  formatOptions() {
    return this.props.options.map(each =>
      typeof each === 'object'
        ? each
        : {
            value: each,
            name: each
          }
    )
  }
  renderOptions() {
    const { options } = this.state
    const { all, allLabel } = this.props
    return (
      <>
        {all && (
          <Item
            className='select-option'
            onClick={() => this.handleClick({ value: undefined })}>
            {allLabel}
          </Item>
        )}
        {options.map(each => (
          <Item
            key={each.value}
            className='select-option'
            onClick={() => this.handleClick(each)}>
            {each.name}
          </Item>
        ))}
      </>
    )
  }

  render() {
    const { options } = this.state
    const select = this.getSelected(this.props.value, options)
    const overlay = this.renderOptions()
    return (
      <DropDown
        overlay={overlay}
        overlayClass={'select-option-dropdown scroll-container'}>
        {show => (
          <div className={cls('common-select-container', { show })}>
            <div className={`select-btn${select ? '' : ' placeholder'}`}>
              {select || this.props.placeholder}
            </div>
            <span className='select-dropdown-icon'>
              <svg
                viewBox='0 0 1024 1024'
                data-icon='caret-down'
                width='1em'
                height='1em'
                fill='currentColor'
                aria-hidden='true'
                focusable='false'>
                <path d='M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z' />
              </svg>
            </span>
          </div>
        )}
      </DropDown>
    )
  }
}
