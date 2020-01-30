import React, { useState } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from './pages/Auth';
import CardsPage from './pages/Cards';
import MainNavigation from './components/navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';

function App() {
   
  const [token,setToken] = useState(null);
  
 const login = (token) => {
     setToken(token);
  }

 const logout = () => {
    setToken(null);
  };

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider value={{
          token: token , 
          login: login, 
          logout: logout
        }}>
        <MainNavigation />
          <main className="main">
          <Switch>
           {!token &&  <Redirect from="/" to="/auth" exact />} 
           {token &&  <Redirect from="/auth" to="/cards" exact />} 
           {!token &&  <Redirect from="/cards" to="/auth" exact />} 
           {!token && <Route path="/auth" component={AuthPage} />}    
           {token && <Route path="/cards" component={CardsPage} /> } 
          </Switch>
        </main>
        </AuthContext.Provider>
 
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
