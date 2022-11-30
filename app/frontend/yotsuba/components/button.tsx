import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

interface ButtonProps {
  text?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  block?: boolean
  secondary?: boolean
  className?: string
  title?: string
  children?: React.ReactNode
}

export default class Button extends React.PureComponent<ButtonProps> {
  public node!: React.LegacyRef<HTMLButtonElement>

  static propTypes = {
    text: PropTypes.node,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    secondary: PropTypes.bool,
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node
  }

  focus() {
    (this.node as unknown as HTMLButtonElement).focus()
  }

  handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!this.props.disabled) {
      this.props.onClick!(e)
    }
  }

  setRef(c: React.LegacyRef<HTMLButtonElement>) {
    this.node = c
  }

  render() {
    let attrs: {
      className: string
      disabled?: boolean
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
      ref: (c: React.LegacyRef<HTMLButtonElement>) => void
      title?: string
    } = {
      className: classNames('button', this.props.className, {
        'button-secondary': this.props.secondary,
        'button--block': this.props.block
      }),
      disabled: this.props.disabled,
      onClick: this.handleClick,
      ref: (this.setRef as any)
    }

    if (this.props.title) { attrs.title = this.props.title }

    return (
      <button {...attrs as any}>
        {this.props.text || this.props.children}
      </button>
    )
  }
}
