import React, { Component } from 'react'
import logo from './logo.svg'
import react_router_logo from './img/react-router-logo.png'
import './App.css'
import SimpleForm from './components/SimpleForm'
import TediousForm from './components/TediousForm'
import FormikForm from './components/FormikForm'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

const activeStyle = { color: '#61dafb' }

const Header = () => (
  <header className="App-header">
    <div className="logoContainer">
      <img src={logo} className="App-logo" alt="react logo" />
      <span className="heart">❤</span>
      <img src={react_router_logo} className="router_logo" alt="formik logo" />
    </div>
    <h1 className="App-title">One Router to Rule Them All</h1>
    <div>
      <NavLink to="/simple" className="form-link" activeStyle={activeStyle}>
        Simple
      </NavLink>
      <NavLink to="/tedious" className="form-link" activeStyle={activeStyle}>
        Tedious
      </NavLink>
      <NavLink to="/formik" className="form-link" activeStyle={activeStyle}>
        Formik
      </NavLink>
    </div>
  </header>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <Route
              exact
              path="/"
              render={() => <h3>Choose Simple, Tedious, or Formik</h3>}
            />
            <Route path="/simple" component={SimpleForm} />
            <Route path="/tedious" component={TediousForm} />
            <Route path="/formik" component={FormikForm} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
