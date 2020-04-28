import React, { useState, useContext } from 'react';
import Fade from 'react-reveal/Fade';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

// contexts
import { MapContext } from '../../contexts/MapContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { JourneyContext } from '../../contexts/JourneyContext';


// material ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';

// material icons
import AddBoxIcon from '@material-ui/icons/AddBox';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import SmokeFreeIcon from '@material-ui/icons/SmokeFree';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

// components
import ImageCard from './ImageCard';


// private methods
const getPlacePictures = async (selectedPlace) => {
    const res = await fetch (`https://api.unsplash.com/search/photos?page=1&query=${selectedPlace.name}&client_id=Lih2C_mt5MYO_pJ4cm_sFYO7-eLGPc5j_CnkjxfCGRg`);
    const result = await res.json();
    return result.results[0].urls.small;
}
const addToJounrneyHandler = () => {

}

const Details = () => {
    // consuming contexts
    const { selectedPlace, placeDetails, isImageLoading, placeImages } = useContext(MapContext);
    const { journey, mode, changeMode, updateJourney, saveJourney } = useContext(JourneyContext);
    const { isLightTheme, darkTheme, lightTheme, darkThemeSwitch } = useContext(ThemeContext);

    // styles
    const useStyles = makeStyles(theme => ({
        root: {
            padding: '8px',
        },
        button: {  
            boxShadow:'0px 4px 24px -1px rgba(0, 0, 0, 0.05)',
            borderRadius: '10px',
        },
        flexVer: {
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
        },
        flexItem: {
            margin: '8px',
        },
        flexHor: {
            display: 'flex',
            flexGrow: '1',
            justifyContent: 'space-between'
        },
        center: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            height: '100%', 
            width: '100%', 
            padding: '10px',
            
            boxShadow:'0px 4px 24px -1px rgba(0, 0, 0, 0.05)',
            borderRadius: '20px',
        },
        subtitle: {
            textAlign: 'center',
        },
        gallery: {
            
        },
        media: {
            height: 160,
        },
        tags: {
            color: 'grey'
        },
    }));
    
    const classes = useStyles();


    return (
        <Fade>
        <div className={classes.root}>
            <Box className={classes.flexVer}>
                
                <Box className={`${classes.gallery} ${classes.flexItem}`}>
                    <ImageCard/>
                </Box>
                <Box className={`${classes.subtitle}`}>
                    <Typography style={{ fontWeight:'150', fontSize: '16px' }} variant='body1'> {placeDetails.subtitle ? placeDetails.subtitle : ''} </Typography>
                </Box>
                <Box className={`${classes.center} ${classes.flexItem}`}>
                    {mode === 'EDIT' ?
                        <Button onClick={addToJounrneyHandler} 
                        variant="contained" 
                        color="primary" 
                        disableElevation 
                        startIcon={<AddBoxIcon/>} 
                        className={classes.button}
                        >
                            Add to Journey
                        </Button>
                    :
                        // <Typography style={{ fontStyle:'italic' }} variant='caption'> Create a journey to add this place </Typography>
                        null
                    }
                </Box>
                <Box className={classes.flexItem}>
                    <Divider/>
                </Box>
                <Box className={`${classes.tags} ${classes.flexItem}`}>
                    <Box className={classes.flexHor}>
                        <LocationCityIcon/>
                        <LocalCafeIcon/>
                        <SmokeFreeIcon/>
                        <QueryBuilderIcon/>
                        <LocationCityIcon/>
                        <LocalCafeIcon/>
                    </Box>
                </Box>
                <Box className={classes.flexItem}>
                    <Divider/>
                </Box>
                <Box className={`${classes.description} ${classes.flexItem}`}>
                    <Typography style={{ fontWeight:'400', fontSize: '14px' }} variant='body1'> {placeDetails.description ? placeDetails.description : ''} </Typography>
                </Box>

            </Box>
        </div>
        </Fade>
    );
}

export default Details;