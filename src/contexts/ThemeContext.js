import React, { createContext, useState } from 'react';
import { createMuiTheme } from '@material-ui/core';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {

    const lightTheme = createMuiTheme({
        palette: {
          type: 'light',
          primary: {
            main: '#3498db',
          },
        //   secondary: {
        //     main: '#ff80ab',
        //   },
          background: {
            paper: '#ffffff',
            shadeA: '#e8e9ed',
            shadeB: '#f5f5f5',
            shadeC: '#ffffff',
          }
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
                default: '#304261',
                paper: '#1c2733',
                shadeA: '#30404f',
                shadeB: '#263442',
                shadeC: '#1c2733',
            }
        }
    });

    const [isLightTheme, setIsLightTheme] = useState(true);
    
    const darkThemeSwitch = (bool) => {
        setIsLightTheme(!bool);
    }
    const setAutoTheme = async () => {
        const res = await fetch('http://worldtimeapi.org/api/ip');
        const result = await res.json();
        const dateString = result.datetime;
        const date = new Date(dateString);
        const time = date.getHours();
        if (time > 18 || time < 7) {
            setIsLightTheme(false);
        } else {
            setIsLightTheme(true);
        }

    }

    return ( 
        <ThemeContext.Provider value={{ isLightTheme, lightTheme, darkTheme, darkThemeSwitch, setAutoTheme }}>
            {children}
        </ThemeContext.Provider>
     );
}
 
export default ThemeContextProvider;