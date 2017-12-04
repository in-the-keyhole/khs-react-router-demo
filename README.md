This project was bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app).

The code for this walkthrough is available
[here](https://github.com/in-the-keyhole/khs-react-router-demo).

Instructions for use: `yarn install && yarn start`

> Note: I will be assuming some familiarity with React in general, including
> lifecycle hooks and props/state. If you need a refresher, checkout this great
> article [here](https://keyholesoftware.com/2017/06/29/my-reaction-to-react/)
> and the offical [React docs](https://reactjs.org/).

# One Router to Rule Them All

## An Introduction to React Router

[Previously](https://keyholesoftware.com/2017/10/23/the-joy-of-forms-with-react-and-formik/),
we looked at a very basic example of how one can benefit greatly by using
community projects such as [Formik](https://github.com/jaredpalmer/formik) to
avoid the tedium of certain solutions while embracing convention to create
composable and scalable applications. We will be building on that foundation to
explore the objectively great library that is
[React Router](https://reacttraining.com/react-router/).

React Router has been at the forefront of routing in the React ecosystem for as
long as I can remember. If you're new to React, this is the way to go when you
move beyond `return` based on `state` and start needing more options such as
parameterized routing, nesting, and conditional rendering. If you have
experience with React, this brings a powerful pattern to bear in that everything
is a component. It takes the composablity of React and uses that to its benefit,
handling any and all use-cases with relative ease.

## State Be Gone!

> If you would like to follow along, please clone the
> [Forms Demo Application](https://github.com/in-the-keyhole/khs-react-form-demo).
> This will be the baseline upon which all examples will be drawn.

To begin, we need to look at a simple way that many applications start out:
returning UI components based on `props` and `state`. This is the foundation of
React, and so happens to be all that was necessary to get our previous
application up and running. Our list of games is fine for what it is, and
searching works for us, but really, it might be nice if we could get a little
more out of it - maybe a nice look at details for each game and a way to
bookmark our favorites while we're at it?

Take a look at the `render` method in `App.js`. We're changing the form type
based on `state`. As the comment notes:

> `// this will do in a pinch, but should really be a router instead`

Let's make that happen.

### Routes

The first thing we need to do is install `react-router-dom`. This is the package
that gives us everything we need for Routes and Links in the browser. We can
accomplish this using yarn.

`yarn add react-router-dom`

Next we need to import the `BrowserRouter` and `Route` dependencies. At the top
of the file, add the following import statement.

`import { BrowserRouter as Router, Route } from 'react-router-dom'`

> Quick tip: The `as` keyword can be used to rename imports for convenience.

Next, let's add the Routes we need to display our forms.

Remove the switch statement in the render method and remove all references to
the `form` and `formType` variables. Replace the `form` div after the header
with our new `Router` setup (and to clean things up just a little bit, I've
extracted the Header into a functional component). The components should now
look like this.

```javascript
const Header = () => (
  <header className="App-header">
    <div className="logoContainer">
      <img src={logo} className="App-logo" alt="react logo" />
      <span className="heart">❤</span>
      <img src={formik_logo} className="logo" alt="formik logo" />
    </div>
    <h1 className="App-title">The Joy of Forms with React and Formik</h1>
    <div>
      <span
        className="form-link"
        onClick={() => this.handleChangeForm('simple')}
      >
        Simple
      </span>
      <span
        className="form-link"
        onClick={() => this.handleChangeForm('tedious')}
      >
        Tedious
      </span>
      <span
        className="form-link"
        onClick={() => this.handleChangeForm('formik')}
      >
        Formik
      </span>
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
```

Let's breakdown a few of these elements.

The `Router` block is what allows react-router to match each of the `Route`
objects `path` props and display the corresponding `component`. These can be any
React component. You can also pass a function to the `children` or `render`
props that returns a component, as is done for the root ("/") `Route`. Try going
to [http://localhost:3000/simple](http://localhost:3000/simple) to see the
router in action!

![Router](/assets/not_exactly.PNG "Not exactly what we're lookikng for...")

There's our gamelist rendered with the `Route` since the path matches. Huzzah!
But, there's one thing amiss here, and that is the "/" route and the "/simple"
routes are both rendering. The matching expression still works for both of them,
so it's rendering them in the order it discovers them. We would rather it be one
or the other, so we can add the `exact` prop to the root `Route` to fix the
behavior.

```
<Route
  exact
  path="/"
  render={() => <h3>Choose Simple, Tedious, or Formik</h3>}
/>
```

![Router](/assets/better.PNG "Much better.")

That's more like it!

### Links

Now, if you click around you'll notice that the navigation we had setup
previously no longer works and the app will yell at you since we have gotten rid
of the `handleChangeForm` functions. Not to worry, `Link` is here for you.

First, we will import the `Link` from `react-router-dom`.

`import { BrowserRouter as Router, Route, Link } from 'react-router-dom'`

Next, we will replace the `span`s in the header with `Link` components, keeping
the styling we had previously.

```
<Link to="/simple" className="form-link">
  Simple
</Link>
<Link to="/tedious" className="form-link">
  Tedious
</Link>
<Link to="/formik" className="form-link">
  Formik
</Link>
```

That's it! Click your beautiful links and see the router do its thing.

For one last flourish, let's give a little color to the active link so we know
which form we've selected. This can be done with the `NavLink` component from
`react-router-dom`. Replace the `Link` instances with `NavLink`. `NavLink` will
allow us to apply styles when the route matches the `Link`. There are two ways
we can accomplish this - either with `activeStyle` or `activeClassName` props.
For this simple example, we will supply a style object that will be applied for
each of our links.

Create a `const` above the `Header` declaration to hold our active style color:

`const activeStyle = { color: '#61dafb' }`

Next, we can supply that to the `activeStyle` prop on our `NavLink` components,
as shown here:

```
<NavLink to="/simple" className="form-link" activeStyle={activeStyle}>
  Simple
</NavLink>
<NavLink to="/tedious" className="form-link" activeStyle={activeStyle}>
  Tedious
</NavLink>
<NavLink to="/formik" className="form-link" activeStyle={activeStyle}>
  Formik
</NavLink>
```

![Router](/assets/active.PNG "Active link highlighted.")

Our active link is highlighted with our nice blue color.

## Attention to Detail

Now let's see about grabbing some details for our games. We're going to use the
great [Internet Games Database Api](https://api.igdb.com/) to grab info for our
games. Take a look at [api.js](todo link) for the implementation; I won't go
into it here (it's simple, I promise!). Our Simple route is all we'll be dealing
with; it will follow a common Master-detail view pattern, with the searchable
list of games on the left, and a new section on the list for our details.

First, we modify the `SimpleForm` to hold our view, along with a route to hold
our `GameDetail` component. If you have ever done any other sort of server or
client-side routing, this will probably look familiar. If not, don't worry.
Let's break it down.

```
...
<div>
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
      <Route
        path="/simple/games/:name"
        render={({ match }) => <GameDetail match={match} />}
      />
    </div>
  </div>
</div>
...
```

The only major change here is the `Route`. Like before, it has a `path` and a
`render` prop that we will use to match the URL we want to use and the component
we want to render. We're destructuring the `match` prop from the other props
that React Router gives us and passing it down for use in our detail component.
In our case, what we're after is the `:name` parameter from the route's `path`.
This allows us to have any games referenced using this route within a route
(sub-route) so we can provide a nice experience for the user. This name is
provided to use by the change we need to make to the links in the `GameList`
component. At the bottom of our `GameList`, we change the `div` to a `Link`
component, the same as we did before (don't forget to import it from
`react-router-dom`).

```
...
<div key={index}>
  <Link to={`/simple/games/${game.name}`}>{game.name}</Link>
</div>
...
```

Note that the `Link to` prop value matches the route - so we put a game's name
at the end of the route, and it matches the Route path we have provided in the
`SimpleForm` component.

All that is left is to create the `GameDetail` component. You can find the code
on [Github](TODO link to GameDetail) - there's too much to post here.
Alternatively, you can take a look at the [IGDB](https://api.igdb.com/) and
implement your own detail page!

![Router](/assets/details.PNG)

## Subtle Transitions

For our final act, we're going to add some slight transitions to make it look a
little more magical - and this is the real world, so let's be honest: we're
going to fudge some loading times with this as well. ;)

First, let's install a library that will help us get this done.

`yarn add react-transition-group`

Next, import the dependencies we'll use:

`import { CSSTransition, TransitionGroup } from 'react-transition-group'`

Before we change our components, we need to add a css file that we'll need
later.

Add a file named `transitions.css` to `/src/components` and copy the following
classes into it:

```css
.fade-exit {
  transition: opacity 0.2s linear;
  opacity: 1;
}

.fade-exit-active {
  opacity: 0;
}
```

Import this at the top of `SimpleForm.js`.

`import './transitions.css'`

Next, we're going to modify our render method to look like this:

```
render = () => {
  const currentKey = this.props.location.pathname.split('/')[3] || '/'
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
```

The `TransitionGroup` is what allows us to list one or more transitions and have
them be managed for us. This, in turn, lets us put a `CSSTransition` component
inside and have it manage the mounting and unmounting (and related css styles)
transition animations. The `key` is key, here.

`const currentKey = this.props.location.pathname.split('/')[3] || '/'`

This tells the `CSSTransition` when to transition. At this point in our app, if
you were to console log the pathname, you might say something like this:
`/simple/games/Factorio`. The game name in this route will change, and that key
change tells the `CSSTransition` to do its thing. The classNames prop is related
to the css we added earlier. By convention, this tells the transition to prefix
the event names with `fade`, so we end up with the css classes in our
`transitions.css` file applying the transition animation for fading out as we
change routes.

## That's it!

That's all I have for you, but believe me, there's plenty more to see
(transition prevention, responsive routes, recursive paths, server rendering,
etc). The best part is, it's components all the way down! Make sure and check
out the [docs](https://reacttraining.com/react-router/) for examples of
everything mentioned here.

Hats off to [Michael Jackson](https://twitter.com/mjackson) and
[Ryan Florence](https://twitter.com/ryanflorence) for this great library. Follow
them on twitter!

I hope this example helped shed some light on the basics of React Router. If you
have any feedback, please feel free to leave it in the comments below. If you
need any additional assitance or training with React, Keyhole Software is happy
to help -
[hit us up!](https://keyholesoftware.com/contact/contact-and-locations/)! Thanks
for reading.
