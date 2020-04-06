import React, { createContext, useState } from 'react';

export const JourneyContext = createContext();

export default function JourneyContextProvider({ children }) {

    // states
    const [journey, setJourney] = useState({
        title: '',
        startDate: null,
        endDate: null,
        type: 'Auto',
        scale: 'Auto',
        budget: 'Auto'
    });
    const [mode, setMode] = useState('CREATE'); //mode can have 2 values "CREATE" "EDIT"


    // public handlers
    const changeMode = (mode) => {
        setMode(mode);
    };
    const updateJourney = (update) => {
        setJourney({ ...Object.assign(journey, update) });
    };
    const saveJourney = () => {
        // Async save to the database with API call
        console.log("Jounrey Saved: ", journey);
    };



    return (
        <JourneyContext.Provider value={{ journey, mode, changeMode, updateJourney, saveJourney }}>
            {children}
        </JourneyContext.Provider>
    );
}