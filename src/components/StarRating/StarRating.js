import React, { Component } from 'react'
import { Star } from './Star'

export class StarRating extends Component {
  state = { hoverIndex: null }

  onMouseLeave = () => {
    this.setState(() => ({ hoverIndex: null }))
  }

  handleMouseOverForIndex = (hoverIndex, over) => {
    this.setState((prevState, props) => {
      if (prevState.hoverIndex !== hoverIndex) {
        return { hoverIndex }
      }
    })
  }

  handleRatingUpdate = index => {
    this.props.onRatingUpdate(index * (100 / this.props.outOf))
  }

  render() {
    const { rating, outOf } = this.props
    const { hoverIndex } = this.state
    const numberOfStars = Math.round(rating / 5) * 5 / outOf
    const starBar = []
    for (let index = 1; index <= outOf; index++) {
      let filled
      if (hoverIndex !== null) {
        filled = index <= hoverIndex
      } else {
        filled = index <= numberOfStars
      }

      starBar.push(
        <Star
          key={index}
          onUpdateRating={this.handleRatingUpdate}
          onMouseOver={this.handleMouseOverForIndex}
          index={index}
          filled={filled}
        />
      )
    }

    return <div onMouseLeave={this.onMouseLeave}>{starBar}</div>
  }
}
