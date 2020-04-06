import React, { useContext } from 'react';

// contexts
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';

// material ui
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

// material icons
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailIcon from '@material-ui/icons/Mail';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';



// components
import Mapbox from '../mapbox';
import { dark } from '@material-ui/core/styles/createPalette';

const useStyles = makeStyles(theme => ({

    root: {
        height: '100vh',
        width: '100vw'
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
        
    },
    gridContainerBlue: {
       height: 'calc(100% - 60px)'
    },
    topBar: {
        display: 'flex',
        height: '60px',
        width: '100%',
        // borderTopLeftRadius: '10px',
    },
    toolbar: {
        // borderRadius: '0px 20px 20px 0px',
        width: '100px',
        height: '100vh',
    },
    leftSectionItem: {
        margin: '10px',
        
    },
    searchbar: {
        width: '75%',
        height: '40px',
        
        borderRadius: '20px'
    },
    recommendedPlaces: {
        height: '100%',
        padding:'10px',
        borderRadius: '10px',
    },
    placeDetails: {
        height: '100%',
        width: '100%',
        // borderRadius: '20px 0px 0px 20px',
    },
    mapbox: {
        borderRadius: '10px', 
        padding: '5px', 
        margin: '10px'
    },

}));

export default function Dashboard() {
    
    const classes = useStyles();

    // consuming contexts
    const { isLightTheme, darkTheme, lightTheme } = useContext(ThemeContext);
    const { logOut, user } = useContext(AuthContext);

    return ( 
        <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
            
                <CssBaseline/>
                <div className={classes.flexHor}>

                    <Box >
                        
                        {/* toolbar COMPONENT */}
                        <Paper elevation={3} className={classes.toolbar}>
                            Toolbar
                        </Paper>

                    </Box>

                    <Grid className={classes.gridContainerPink} container wrap='nowrap'>
                        
                        <Grid className={classes.gridItemPink} item xs={9}>

                            
                            <Box style={{ background: isLightTheme ? lightTheme.palette.background.paper : darkTheme.palette.background.paper }} className={classes.topBar}>

                                <Grid container>
                                    <Grid item xs={6}>
                                        <Box className={classes.center}>
                                            <Box elevation={3} className={classes.searchbar}>
                                                <Grid style={{ height: '100%' }} container>
                                                    <Grid item xs={2}>
                                                        <Box className={classes.center}>
                                                            <SearchIcon/>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={10}>
                                                        <Box style={{ display: 'flex', height: '100%' }}>
                                                            <InputBase
                                                            placeholder='Search a Place' />
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        
                                    </Grid>
                                </Grid>

                            </Box>
                            

                            <Grid className={classes.gridContainerBlue} container>
                                
                                <Grid className={classes.gridItemBlue} style={{ borderBottomLeftRadius: '10px' }} container item xs={3}>
            
                                        <Grid className={classes.leftSectionItem} item xs={12}>
                                            <Paper elevation={3} className={classes.recommendedPlaces}>
                                                <Container>
                                                    Recommended
                                                </Container>
                                            </Paper>
                                        </Grid>
                                        <Grid className={classes.leftSectionItem} item xs={12}>
                                            <Paper elevation={3} className={classes.recommendedPlaces}>
                                                <Container>
                                                    Explore
                                                </Container>
                                            </Paper>
                                        </Grid>
                                        

                                </Grid>

                                <Grid className={classes.gridItemBlue} item xs={9}>

                                    <Paper elevation={3} className={classes.mapbox}>
                                        {/* MAP COMPONENT */}
                                        <Mapbox/>
                                    </Paper>

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid className={classes.gridItemPink} item xs={3}>

                            
                            <Paper elevation={3} className={classes.placeDetails}>
                                {/* PLACEDETAILS COMPONENT */}
                            </Paper>

                        </Grid>

                    </Grid>
                </div>
            
        </ThemeProvider>
    );
}