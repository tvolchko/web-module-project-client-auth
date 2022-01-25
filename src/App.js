import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Login from './Components/Login';
import FriendsList from './Components/FriendsList';
import AddFriend from './Components/AddFriends';
import Logout from './Components/Logout';
import axiosWithAuth from './util/axiosWithAuth';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  const [ friends, setFriends ] = useState([])
  const [ token, setToken ] = useState(localStorage.getItem('token'))

  const getFriends = () => {
    axiosWithAuth().get('/friends')
    .then(resp => {
        console.log(resp)
        setFriends(resp.data)
    })
  }


  return (
    <Router>
      <div className="App">
        <h2>Client Auth Project</h2>
      </div>
        <Link to={'/add'}>Add Friends</Link> <br/>
        <Link to={'/login'}>Login</Link> <br/>
        <Link to={'/logout'}>Logout</Link> <br/>
        <Link to={'/friends'}>See Friends</Link>
      <Switch>
        <PrivateRoute exact path='/add' setFriends={setFriends} friends={friends} component={AddFriend} />
        <PrivateRoute exact path='/friends' friends={friends} getFriends={getFriends} component={FriendsList} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" render={() => (
          <Login token={token} setToken={setToken}/>
            )
          } />
        <Route path="/" render={() => (
          <Login token={token} setToken={setToken}/>
            )
          } />  
        

        
      </Switch>
    </Router>
  );
}

export default App;
