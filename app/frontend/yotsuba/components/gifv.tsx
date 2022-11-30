import PropTypes from 'prop-types'
import React from 'react'

interface GIFVProps {
  src: string
  alt?: string
  width?: number
  height?: number
  onClick?: (...args: any[]) => any
}

export default class GIFV extends React.PureComponent<GIFVProps> {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    onClick: PropTypes.func
  }

  state = {
    loading: true
  }

  componentWillReceiveProps(nextProps: Readonly<GIFVProps>) {
    if (nextProps.src !== this.props.src) {
      this.setState({ loading: true })
    }
  }

  handleClick(e: React.MouseEvent) {
    const { onClick } = this.props

    if (onClick) {
      e.stopPropagation()
      onClick()
    }
  }

  handleLoadedData() {
    this.setState({ loading: false })
  }

  render() {
    const { src, width, height, alt } = this.props
    const { loading } = this.state

    return (
      <div className='gifv' style={{ position: 'relative' }}>
        {loading && (
          <canvas
            height={height}
            onClick={this.handleClick}
            role='button'
            tabIndex={0}
            title={alt}
            width={width}
            aria-label={alt}
          />
        )}

        <video
          autoPlay
          loop
          muted
          onClick={this.handleClick}
          onLoadedData={this.handleLoadedData}
          playsInline
          role='button'
          src={src}
          style={{ left: 0, position: loading ? 'absolute' : 'static', top: 0 }}
          tabIndex={0}
          title={alt}
          aria-label={alt}
        />
      </div>
    )
  }
}
