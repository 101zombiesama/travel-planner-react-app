import React, { useState, useContext } from 'react';
import Fade from 'react-reveal/Fade';

// contexts
import { JourneyContext } from '../../contexts/JourneyContext';

// Material ui
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

// Material icons



const EditJourney = () => {
    // Consuming contexts
    const { journey, updateJourney } = useContext(JourneyContext);

    // private states
    

    const types = ['Auto', 'Nature', 'Urban', 'Metro', 'Cultural', 'Mountain', 'Ocean/Beaches', 'Rural'];
    const scales = ['Auto', 'City', 'National', 'Global'];

    // pricate handlers
    const typeChangehandler = (e) => {
        updateJourney({ type: e.target.value });
    };
    const scaleChangehandler = (e) => {
        updateJourney({ scale: e.target.value });
    };
    const handleStartDateChange = (date) => {
        updateJourney({ startDate: date });
    };
    const handleEndDateChange = (date) => {
        updateJourney({ endDate: date });
    };

    const useStyles = makeStyles(theme => ({

        root: {
            height: '100%',
            width: '100%'
        },
        button: {  
            boxShadow:'0px 4px 24px -1px rgba(0, 0, 0, 0.05)',
            borderRadius: '10px',
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
    
    }));
    
    const classes = useStyles();

    return ( 
        <Fade>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid style={{ height: '100%', width: '100%', background: '' }} container>
            
            <Grid item xs={12}>
                <Box className={classes.center}>
                    <Typography variant='h5' > {journey.title} </Typography>
                </Box>
                <Divider style={{ margin: '5px 10px 5px 10px' }} />
            </Grid>
            <Grid container item xs={12}>
                <Grid style={{ padding: '10px' }} item xs={3}>
                    <Box className={classes.center}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Start Date"
                            value={journey.startDate}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                    </Box>
                </Grid>
                <Grid style={{ padding: '10px' }} item xs={3}>
                    <Box className={classes.center}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Start Date"
                            value={journey.endDate}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                    </Box>
                </Grid>
                <Grid style={{ padding: '10px' }} item xs={3}>
                    <Box className={classes.center}>
                        <TextField
                            select
                            label="Select"
                            value={journey.type}
                            onChange={typeChangehandler}
                            helperText="Type"
                            >
                            {types.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </Grid>
                <Grid style={{ padding: '10px' }} item xs={3}>
                    <Box className={classes.center}>
                        <TextField
                            select
                            label="Select"
                            value={journey.scale}
                            onChange={scaleChangehandler}
                            helperText="Scale"
                            >
                            {scales.map((option) => (
                                <MenuItem key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </Grid>
            </Grid>

        </Grid>
        </MuiPickersUtilsProvider>
        </Fade>
     );
}
 
export default EditJourney;