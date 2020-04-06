import React, { useState, useContext } from 'react';
import Fade from 'react-reveal/Fade';


//Contexts 
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

// Material icons
import AddBoxIcon from '@material-ui/icons/AddBox';


const CreateJourney = () => {

    // Consuming contexts
    const { journey, updateJourney, changeMode } = useContext(JourneyContext);

    // private states
    const [title, setTitle] = useState('')
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [isCreating, setIscreating] = useState(false);

    // pricate handlers
    const titleChangeHandler = (e) => {
        setTitle(e.target.value);
    };
    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };
    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };
    const createButtonHandler = () => {
        updateJourney({ title, startDate: selectedStartDate, endDate: selectedEndDate });
        changeMode('EDIT');
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
                <Grid style={{ padding: '10px' }} container item xs={9}>

                    <Grid item xs={12}>
                        <Box className={classes.center}>
                            <TextField fullWidth onChange={titleChangeHandler} variant='outlined' label='Journey Title' />
                        </Box>
                    </Grid>
                    <Grid container item xs={12}>

                        <Grid item xs={6}>
                            <Box style={{ padding: '10px', height: '50px' }} className={classes.center}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Start Date"
                                value={selectedStartDate}
                                onChange={handleStartDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box style={{ padding: '10px', height: '50px' }} className={classes.center}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="End Date"
                                value={selectedEndDate}
                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                            </Box>
                        </Grid>

                    </Grid>

                </Grid>
                
                <Grid item xs={3}>
                    <Box className={classes.center}>
                        
                            <Button onClick={createButtonHandler} variant="contained" color="primary" disableElevation startIcon={<AddBoxIcon/>} className={classes.button}>
                                Create
                            </Button>
                        
                    </Box>
                </Grid>
        </Grid>
        </MuiPickersUtilsProvider>
        </Fade>
     );
}
 
export default CreateJourney;