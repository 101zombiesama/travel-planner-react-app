import React, { useContext, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { AuthContext } from './contexts/AuthContext'
import { ThemeContext } from './contexts/ThemeContext'
import { ThemeProvider } from '@material-ui/core/styles';
import JourneyContextProvider from  './contexts/JourneyContext';
import MapContextProvider from './contexts/MapContext';
import './App.css';
import Login from './components/login';
import Layout from './components/layout';
import BounceLoader from "react-spinners/BounceLoader";

function App() {
  const { isLoggedIn, isLoading, fetchIsLoggedIn } = useContext(AuthContext);
  const { isLightTheme, lightTheme, darkTheme, setAutoTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetchIsLoggedIn();
    setAutoTheme();
  }, []);

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <div className="App">
        { isLoading ? 
        <Fade><BounceLoader size={100} /></Fade> : 
        isLoggedIn ? 
        <JourneyContextProvider>
        <MapContextProvider>
          <Layout />
        </MapContextProvider>
        </JourneyContextProvider> : 
        <Login /> }
      </div>
    </ThemeProvider>
  );
}

export default App;
