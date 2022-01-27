import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Users from './Users';
import { useStateValue } from './stateProvider';
import { authenticate } from './firebase';
import { onAuthStateChanged } from '@firebase/auth';
import { useEffect } from 'react';
import UserInfo from './UserInfo'


function App() {
  const [{}, dispatch]= useStateValue();
  useEffect(()=>{
    onAuthStateChanged(authenticate, (authUser)=> {
      if(authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      }else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    })

  }, []);
  return (
    <Router>
    <div className="App">
    <Routes>
    <Route exact path="/" element={<Login />} />
    <Route path="/users" element={<Users />} />
    <Route exact path="/users-info" element={<UserInfo />} />
    </Routes>
    </div>
    </Router>
  );
}

export default App;
