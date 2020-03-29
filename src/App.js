import React from 'react';
import ThemeContextProvider from './contexts/ThemeContext';
import Login from './components/login';
import Dashboard from './components/dashboard';

function App() {

  const loggedIn = false;

  return (
    <ThemeContextProvider>
      <div className="App">
        { loggedIn ? <Dashboard /> : <Login /> }
      </div>
    </ThemeContextProvider>
  );
}

export default App;
