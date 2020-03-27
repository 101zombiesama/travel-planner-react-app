import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Test from './components/test';

function App() {

  const loggedIn = false;
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#82b1ff',
      },
      secondary: {
        main: '#ff80ab',
      },
      background: {
        paper: '#212c40'
      }
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        { loggedIn ? <Dashboard /> : <Test /> }
        {/* <Test/> */}
      </div>
    </MuiThemeProvider>
  );
}

export default App;
