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

## State Be Gone

> If you would like to follow along, please clone the
> [Demo Application](https://github.com/in-the-keyhole/khs-react-form-demo).
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

![Router](/assets/first_router.PNG)

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
