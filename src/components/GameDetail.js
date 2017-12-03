import React, { Component } from 'react'

class GameDetail extends Component {
  state = { gameTitle: null, gameData: null }

  componentDidUpdate() {
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
    const { gameData, gameTitle } = this.state

    if (!gameData) return null

    const { name, url, summary, imageUrl, rating } = gameData

    return (
      <div>
        <h2>{gameTitle}</h2>
        <img src={imageUrl} />
        <p>{summary}</p>
        <a href={url} target="_blank">
          More Information
        </a>
      </div>
    )
  }
}

export default GameDetail
