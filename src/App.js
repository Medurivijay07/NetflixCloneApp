import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import NotFound from './components/NotFound'
import Search from './components/Search'
import ProtectedRoute from './components/ProtectedRoute'
import Account from './components/Account'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute exact path="/account" component={Account} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
