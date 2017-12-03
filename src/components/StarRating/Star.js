import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export class Star extends Component {
  state = { hover: false }

  static propTypes = {
    icon: PropTypes.string,
    hoverColor: PropTypes.string,
    onUpdateRating: PropTypes.func.isRequired
  }

  static defaultProps = {
    icon: 'oi-star',
    hoverColor: 'gold'
  }

  onMouseEnter = () => {
    this.props.onMouseOver(this.props.index, true)
    this.setState(() => ({ hover: true }))
  }
  onMouseLeave = () => {
    this.props.onMouseOver(this.props.index, false)
    this.setState(() => ({ hover: false }))
  }

  render() {
    const { icon, hoverColor, filled, onUpdateRating, index } = this.props
    const style = this.state.hover || filled ? { color: hoverColor } : null
    const classes = classNames('oi', icon)
    return (
      <span
        onClick={() => onUpdateRating(index)}
        className={classes}
        style={{ ...style }}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      />
    )
  }
}
