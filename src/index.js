import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthContextProvider from  './contexts/AuthContext';
import ThemeContextProvider from  './contexts/ThemeContext';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( <AuthContextProvider>
                    <ThemeContextProvider>
                        <App />
                    </ThemeContextProvider>
                </AuthContextProvider>, 
                document.getElementById('root'));

serviceWorker.unregister();
