import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * This shouldn't be all in one file!
 * But, this is just a demo... so...
 */

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
    this.props.onMouseOver(this.props.index)
    this.setState(() => ({ hover: true }))
  }

  onMouseLeave = () => {
    this.props.onMouseOver(this.props.index)
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

export class StarRating extends Component {
  state = { hoverIndex: null }

  onMouseLeave = () => {
    this.setState(() => ({ hoverIndex: null }))
  }

  handleMouseOverForIndex = hoverIndex => {
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
    const numberOfStars = Math.round(rating / outOf)
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

class GameDetail extends Component {
  state = { gameTitle: null, gameData: null }

  componentDidMount() {
    this.fetchGameDetails()
  }

  handleRatingUpdate = rating => {
    const gameData = { ...this.state.gameData, rating }
    this.setState(() => ({ gameData }))
  }

  fetchGameDetails() {
    const gameTitle = this.props.match.params.name
    if (gameTitle && gameTitle !== this.state.gameTitle) {
      fetch(`http://localhost:1338/games?q=${gameTitle}`)
        .then(results => results.json())
        .then(data => {
          this.setState((prevState, props) => ({ gameData: data, gameTitle }))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  render() {
    const { gameData } = this.state

    if (!gameData) return <div />

    const { name, url, summary, imageUrl, rating } = gameData

    // note: image width and height come from IGDB api documentation
    return (
      <div>
        <h2>{name}</h2>
        <img width={90} height={128} src={imageUrl} alt="{name}" />
        <div>
          {rating && <span>Rating: {Math.round(rating.toFixed(2))}%</span>}
          <StarRating
            rating={rating}
            onRatingUpdate={this.handleRatingUpdate}
            outOf={10}
          />
        </div>
        <p>{summary}</p>
        <a href={url} target="_blank">
          More Information
        </a>
      </div>
    )
  }
}

export default GameDetail
