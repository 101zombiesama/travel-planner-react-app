import React, { useContext } from 'react';
import BackgroundDark from './BackgroundDark';
import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeContext } from '../../contexts/ThemeContext';
import BackgroundLight from './BackgroundLight';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ExploreIcon from '@material-ui/icons/Explore';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    fullbody: {
        width: '100vw',
        height: '100vh',
        background: 'transparent'
    },

    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },

    paper: {
        margin: '20px',
        marginTop: '100px',
        padding: '20px',
        width: '400px',
        borderRadius: '20px'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
  }));

const Login = () => {

    const classes = useStyles();
    const {isLightTheme, darkTheme, lightTheme} = useContext(ThemeContext);

    return (
        <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
        <div>
        { isLightTheme ? <BackgroundLight /> : <BackgroundDark /> }
        <div className={classes.fullbody}>
        <CssBaseline />
            <div className={classes.center}>
                <Paper elevation={4} className={classes.paper}>
                    <Container className={classes.center}>
                        <Avatar className={classes.avatar}>
                            <ExploreIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        
                        <form className={classes.form} noValidate>
                            <TextField
                            size='small'
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email / Username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            />
                            <TextField
                            size='small'
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            />
                            <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            />
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            >
                            Sign In
                            </Button>
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            >
                            Sign in with Google
                            <img style={{ marginLeft: '10px' }} alt="G" src={require('./google.png')} />
                            </Button>
                            
                            <Grid container>
                            <Grid item xs>
                                <Link style={ {fontSize: '14px'} } href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link style={ {fontSize: '14px'} } href="#" variant="body2">
                                    {"Sign up"}
                                </Link>
                            </Grid>
                            </Grid>
                        </form>
                    </Container>
                </Paper>
            </div>
        </div>
        </div>
        </ThemeProvider>
     );
}
 
export default Login;