import React, { createContext, Component } from 'react';
import { createMuiTheme } from '@material-ui/core';

export const ThemeContext = createContext();

const lightTheme = createMuiTheme({
    palette: {
      type: 'light',
      // primary: {
      //   main: '#82b1ff',
      // },
      // secondary: {
      //   main: '#ff80ab',
      // },
      // background: {
      //   paper: '#212c40'
      // }
    }
  });
const darkTheme = createMuiTheme({
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

class ThemeContextProvider extends Component {
    state = {
        isLightTheme: true,
        lightTheme,
        darkTheme
    }

    render() {
        return (
            <ThemeContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export default ThemeContextProvider;