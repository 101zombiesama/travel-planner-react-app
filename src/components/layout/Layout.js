import React, { useContext, useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
// contexts
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';
import { JourneyContext } from '../../contexts/JourneyContext';

// components
import CreateJourney from '../createJourney';
import EditJourney from '../editJourney';
import Mapbox from '../mapbox';

// material ui
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// material icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import HistoryIcon from '@material-ui/icons/History';
import SaveIcon from '@material-ui/icons/Save';

import { dark } from '@material-ui/core/styles/createPalette';
import { Typography } from '@material-ui/core';
import { MapContext } from '../../contexts/MapContext';

export default function Layout() {

    // consuming contexts
    const { isLightTheme, darkTheme, lightTheme, darkThemeSwitch } = useContext(ThemeContext);
    const { logOut, user } = useContext(AuthContext);
    const { mode, saveJourney } = useContext(JourneyContext);
    const { mapCenter, selectedPlace, updateSelectedPlace } = useContext(MapContext);

    const theme = isLightTheme ? lightTheme : darkTheme;

    // private states
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchresults, setSearchResults] = useState([]);

    // private handlers
    const themeSwitchHandler = (e) => {
        darkThemeSwitch(e.target.checked);
    }
    const createJourneyHandler = () => {
        
    }
    const openJourneyHandler = () => {

    }
    const openJourneyHistoryHandler = () => {

    }
    const openMessagesHandler = () => {
        console.log(selectedPlace);
    }
    const saveJourneyHandler = () => {
        saveJourney();
    }
    const fetchSearchResults = async (query) => {
        const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
        const result = await res.json();
        if (result.features.length > 0) {
            setSearchResults([...result.features]);
        }

    }
    const searchInputHandler = (query) => {
        if (query.length > 0) {
            setIsSearchActive(true);
            fetchSearchResults(query);
        }
        else setSearchResults([]);
    }


    const useStyles = makeStyles(theme => ({

        root: {
            height: '100vh',
            width: '100vw'
        },
        button: {  
            boxShadow:'0px 4px 24px -1px rgba(0, 0, 0, 0.05)',
            borderRadius: '10px',
        },
        flexHor: {
            display: 'flex',
            flexGrow: '1',
        },
        center: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        gridContainerPink: {
            height: '100vh',
            width: '100vw',
            // background: 'pink'
            
        },
        gridContainerBlue: {
           height: 'calc(100% - 60px)'
        },
        topBar: {
            
            position: 'absolute',
            display: 'flex',
            top: '0px',
            // left: '100px',
            height: '60px',
            width: '100%',
            background: 'transparent',
        },
        toolbar: {
            
            width: '75px',
            height: '100vh',
            background: isLightTheme ? lightTheme.palette.background.shadeC : darkTheme.palette.background.shadeC,
        },
        navListItem:{
            color: 'grey', 
            width: '100%', 
            borderRadius: '10px', 
            marginTop: '20px',
        },
        toolbarContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            width: '100%'
        },
        leftContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            background: isLightTheme ? lightTheme.palette.background.shadeB : darkTheme.palette.background.shadeB,
        },
        leftItemsContainer: {
            height: '100%',
            width: '100%',
        },
        midContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            background: isLightTheme ? lightTheme.palette.background.shadeA : darkTheme.palette.background.shadeA,
        },
        midItemsContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: '',
            height: '100%',
            width: '100%',
            overflow: 'auto'
        },
        rightContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            background: isLightTheme ? lightTheme.palette.background.shadeC : darkTheme.palette.background.shadeC,
        },
        searchbar: {
            width: '50%',
            height: '45px',
            background: isLightTheme ? lightTheme.palette.background.shadeC : darkTheme.palette.background.shadeC,
            borderRadius: '50px'
        },
        searchresults: {
            position: 'absolute',
            transform: 'translate(-16%, 0)',
            top: '60px',
            width: '24%',
            minHeight: '100px',
            maxHeight: '350px',
            overflow: 'auto',
            background: isLightTheme ? lightTheme.palette.background.shadeC : darkTheme.palette.background.shadeC,
            borderRadius: '20px',
            padding: '10px',
            boxShadow:'0px 4px 24px -1px rgba(0, 0, 0, 0.2)',
            zIndex: '100'
        },
        topGutter: {
            width: '100%',
            height: '60px',
            // background: 'blue'
        },
        topGutterRight: {
            // width: '100%',
            height: '95px',
            // background: 'blue'
        },
        recommendedPlaces: {
            width: '100%',
            margin: '15px',
            // border: '1px solid black',
            borderRadius: '10px',
            // background: 'pink'
        },
        paper: {
            height: '100%', 
            width: '100%', 
            padding: '10px',
            
            boxShadow:'0px 4px 24px -1px rgba(0, 0, 0, 0.05)',
            borderRadius: '20px',
        },
        placeDetails: {
            height: '100%',
            width: '100%',
            // borderRadius: '20px 0px 0px 20px',
        },
        mapbox: {
            borderRadius: '20px', 
            margin: '15px 15px 0px 15px',
            padding: '10px', 
            boxShadow:'0px 4px 24px -1px rgba(0, 0, 0, 0.05)',

        },
    
    }));
    
    const classes = useStyles();

    // useEffect hook
    

    return ( 
        <Fade>
        <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
            
                <CssBaseline/>
                <div className={classes.flexHor}>

                    <Box >
                        
                        {/* toolbar COMPONENT */}
                        <Box className={classes.toolbar}>
                            
                            <Box className={classes.toolbarContainer}>
                                <Box style={{ width: '100%', height: '75px' }}>
                                    <Box className={classes.center}>
                                        <Avatar style={{ width: '70px', height: '70px' }} variant='rounded' alt='L' src={require('./logo.png')} />
                                    </Box>
                                </Box>
                                <Box style={{ width: '100%', height: '100%' }}>
                                    
                                    {/* nav list */}
                                    <Box  className={classes}>
                                        <List style={{ width: '100%' }}>

                                            { [<AddBoxIcon onClickFunc={createJourneyHandler}/>, <FolderOpenIcon onClickFunc={openJourneyHandler}/>, 
                                                <HistoryIcon onClickFunc={openJourneyHistoryHandler}/>, <MailIcon onClickFunc={openMessagesHandler}/>, 
                                                <ExitToAppIcon onClickFunc={logOut}/>,
                                                <SaveIcon onClickFunc={saveJourneyHandler} />
                                                ].map((comp, index) => (
                                                    <ListItem onClick={(e) => comp.props.onClickFunc()} className={[classes.center, classes.navListItem]} key={index} button>
                                                        
                                                            {comp}
                                                        
                                                    </ListItem>
                                                )) }

                                        </List>
                                    </Box>

                                </Box>
                                <Box style={{ width: '100%', height: '75px' }}>
                                    <Box className={classes.center}>
                                        <Switch
                                        color='primary'
                                        checked={!isLightTheme}
                                        onChange={themeSwitchHandler} />
                                    </Box>
                                </Box>
                            </Box>

                        </Box>

                    </Box>

                    <Box className={classes.topBar}>

                        <Grid container>
                            <Grid item xs={6}>
                                <Box className={classes.center}>
                                    <Box className={classes.searchbar}>
                                        <Grid style={{ height: '100%' }} container>
                                            <Grid item xs={2}>
                                                <Box className={classes.center}>
                                                    <SearchIcon/>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Box style={{ display: 'flex', height: '100%' }}>
                                                    <ClickAwayListener onClickAway={e => setIsSearchActive(false)}>
                                                        <InputBase
                                                        onInput={e => searchInputHandler(e.target.value)}
                                                        placeholder='Search a Place' />
                                                    </ClickAwayListener>
                                                    
                                                    {
                                                        isSearchActive ?
                                                        <Box className={classes.searchresults}>
                                                            <List style={{ width: '100%' }}>
                                                                { 
                                                                    searchresults.length === 0 ?
                                                                    <Box className={classes.center}>No Results</Box> :
                                                                    searchresults.map((result, index) => (
                                                                        <ListItem onClick={e => updateSelectedPlace(result, 'mapbox')} style={{ borderRadius: '10px' }} key={index} button>
                                                                            {result.place_name}
                                                                        </ListItem>
                                                                    ))
                                                                }
                                                            </List>
                                                        </Box> :
                                                        null
                                                    }

                                                </Box>
                                                
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid container item xs={6}>

                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        {/* Gutter */}
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box className={classes.center}>
                                            <Button>
                                                <NotificationsIcon style={{ color:'grey' }} />
                                            </Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box className={classes.center}>
                                            <Typography> {user.username} </Typography>
                                            <Button>
                                                <Avatar variant='rounded' alt={user.username} src={user.profilePicture} />
                                            </Button>
                                        </Box>
                                    </Grid>

                                </Grid>
                                <Grid item xs={6}>
                                    {/* Gutter */}
                                </Grid>
                                
                            </Grid>
                        </Grid>

                    </Box>
                    

                    <Grid className={classes.gridContainerPink} container >

                            
                                
                                <Grid className={classes.leftContainer}item xs={3}>

                                    <Box className={classes.topGutter}>

                                    </Box>
                                    <Box className={classes.leftItemsContainer}>
                                        
                                        <Grid className={classes.leftItemsContainer} container>

                                            <Grid className={classes.recommendedPlaces} item xs={12}>
                                                <Paper className={classes.paper}>
                                                    Recommended Places
                                                </Paper>
                                            </Grid>
                                            <Grid className={classes.recommendedPlaces} item xs={12}>
                                                <Paper className={classes.paper}>
                                                    Explore New Places
                                                </Paper>
                                            </Grid>

                                        </Grid>

                                    </Box>

                                </Grid>
                                <Grid className={classes.midContainer} item xs={6}>
                                    <Box className={classes.topGutter}>

                                    </Box>
                                    
                                    <Box className={classes.midItemsContainer}>
                                        <Paper style={{ width: 'auto', marginLeft: '15px', marginRight: '15px', marginTop: '15px' }} className={classes.paper}>
                                            {/* Upper mid component */}
                                            
                                            {mode==='CREATE' ? <CreateJourney /> : <EditJourney />}

                                        </Paper>
                                        <Paper className={classes.mapbox}>
                                            <Box>
                                                <Mapbox />
                                            </Box>
                                        </Paper>
                                        
                                    </Box>
                                    

                                </Grid>
                                <Grid className={classes.rightContainer} item xs={3}>
                                    <Box style={{ borderBottom: `2px solid ${theme.palette.background.shadeA}` }} className={classes.topGutter}>
                                        <Box style={{ padding: '10px' }} className={classes.center}>
                                            <Typography noWrap={true} variant='h5' > {selectedPlace.name} </Typography>
                                        </Box>
                                    </Box>
                                    <Box style={{ height: '100%', width: '100%', background: '' }}>
                                        
                                    </Box>
                                </Grid>


                    </Grid>
                </div>
            
        </ThemeProvider>
        </Fade>
    );
}