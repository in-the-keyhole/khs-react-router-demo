import React, { Component } from 'react'
import { StarRating } from './StarRating/StarRating'

class GameDetail extends Component {
  state = { gameTitle: null, gameData: null }

  componentDidMount() {
    this.getGameDetails()
  }

  componentDidUpdate() {
    this.getGameDetails()
  }

  handleRatingUpdate = rating => {
    const gameData = { ...this.state.gameData, rating }
    this.setState(() => ({ gameData }))
  }

  getGameDetails() {
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

    if (!gameData) return null

    const { name, url, summary, imageUrl, rating } = gameData
    return (
      <div>
        <h2>{name}</h2>
        <img src={imageUrl} alt="{name}" />
        <div>
          Rating: {Math.round(rating.toFixed(2))}%
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
