import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Login from './components/login';
import Dashboard from './components/dashboard';

function App() {

  const loggedIn = true;
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
        { loggedIn ? <Dashboard /> : <Login /> }
      </div>
    </MuiThemeProvider>
  );
}

export default App;
