import React, { Component } from 'react'
import GameList from './GameList'
import { Route } from 'react-router-dom'
import GameDetail from './GameDetail'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './transitions.css'

export default class SimpleForm extends Component {
  // static class property - this lets us avoid a constructor
  // altogether since we are not accepting any props
  state = {
    searchTerm: '',
    selectedSearchTerm: ''
  }

  /*
    Using ES6 arrow function syntax lets us avoid 
    needing .bind() statements in our constructor
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  */
  handleSubmit = event => {
    event.preventDefault() // prevent form post
    this.setState((prevState, props) => ({
      selectedSearchTerm: this.state.searchTerm
    }))
  }

  handleSearch = event => {
    const searchTerm = event.target.value
    /*
      Functional set state prevents race conditions 
      due to React internally handling state updates -
      in other words, use this method to prevent unpredictability!
      https://medium.freecodecamp.org/functional-setstate-is-the-future-of-react-374f30401b6b
    */
    this.setState((prevState, props) => ({
      searchTerm
    }))
  }

  render = () => {
    const currentKey = this.props.location.pathname.split('/')[3] || '/'
    console.log(this.props.location.pathname)
    const timeout = { exit: 200 }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Search games"
                value={this.state.searchTerm}
                onChange={this.handleSearch}
              />
              <input type="submit" value="Submit" />
            </form>
            <br />
            <GameList searchTerm={this.state.selectedSearchTerm} />
          </div>
          <div className="col-md-8">
            <TransitionGroup>
              <CSSTransition
                key={currentKey}
                timeout={timeout}
                classNames="fade"
              >
                <Route
                  path="/simple/games/:name"
                  render={({ match }) => <GameDetail match={match} />}
                />
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}
