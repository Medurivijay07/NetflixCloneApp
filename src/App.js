import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Header from './components/Header'
import Home from './components/Home'
import Popular from './components/Popular'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/popular" component={Popular} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
