import React, { useState, useContext } from 'react';
import Fade from 'react-reveal/Fade';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

// contexts
import { MapContext } from '../../contexts/MapContext';
import { ThemeContext } from '../../contexts/ThemeContext';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// material icons
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const ImageCard = () => {

    // consuming contexts
    const { selectedPlace, placeDetails, isImageLoading, placeImages } = useContext(MapContext);
    const { isLightTheme, darkTheme, lightTheme, darkThemeSwitch } = useContext(ThemeContext);

    // privat states
    const [imageIndex, setImageIndex] = useState(0);
    

    // private methods
    const nextImage = () => {
        if (imageIndex === placeImages.length-1) {
            setImageIndex(0);
        }
        setImageIndex(prevIndex => prevIndex + 1);
    }
    const previousImage = () => {
        if (imageIndex === 0) {
            setImageIndex(placeImages.length-1);
        }
        setImageIndex(prevIndex => prevIndex - 1);
    }


    // styles
    const useStyles = makeStyles(theme => ({
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
        media: {
            height: 160,
        },
        imageArrowContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            zIndex: '100',
            background: 'transparent',
            transform: 'translateY(-100px)',
        },
    }));
    
    const classes = useStyles();

    return (
        <Fade>
            <Card style={{ borderRadius:'10px', boxShadow:'0px 4px 24px -1px rgba(0, 0, 0, 0.05)' }} raised='true'>

                {
                    isImageLoading ? 
                        <Fade>
                            <Box style={{ height:'160px' }} className={classes.center}>
                                <ClimbingBoxLoader size={15}
                                color={isLightTheme ? lightTheme.palette.background.shadeA : darkTheme.palette.background.shadeA} />
                            </Box> 
                        </Fade>
                    :
                        placeImages.length > 0 ?
                            <div>
                                <Fade>
                                    <CardMedia className={classes.media} image={placeImages[imageIndex]} />
                                </Fade>                     
                            </div>
                        :
                            <CardMedia className={classes.media} image={require('../../assets/img/image_placeholder.png')} />
                }
            </Card>
            <Box className={classes.imageArrowContainer}>
                <IconButton onClick={previousImage}>
                    <ChevronLeftIcon className='imageArrowPrevious' />
                </IconButton>
                <IconButton onClick={nextImage}>
                    <ChevronRightIcon className='imageArrowNext' />
                </IconButton>
            </Box>
        </Fade>
    );

}

export default ImageCard;