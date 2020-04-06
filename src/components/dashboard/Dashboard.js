import React, { useContext } from 'react';
import './dashboard.css';

// contexts
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';

// material ui
import clsx from 'clsx';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// material icons
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailIcon from '@material-ui/icons/Mail';
import DashboardIcon from '@material-ui/icons/Dashboard';

// components
import Map from '../map';
import Mapbox from '../mapbox';

const drawerWidth = 100;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    avatar: {
        marginTop: '10px',
        marginBottom: '10px',
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1),
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
    map: {
        borderRadius: '10px',
        width: '600px',
        padding: '10px',
    },
}));

export default function Dashboard() {
    
    const classes = useStyles();

    // consuming contexts
    const { isLightTheme, darkTheme, lightTheme } = useContext(ThemeContext);
    const { logOut, user } = useContext(AuthContext);

    return ( 
        <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                PaperProps={ {variant: 'elevation'} }
                className={classes.drawer}
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.avatar}>
                    <Container>
                        <Avatar className={classes.large} alt={user.username} src={user.profilePicture} />
                    </Container>
                </div>
                <Divider />
                <List>
                    { [<InboxIcon/>, <InboxIcon/>, <InboxIcon/>].map((comp, index) => (
                        <ListItem key={index} button>
                            <Container>
                                {comp}
                            </Container>
                        </ListItem>
                    )) }
                </List>
            </Drawer>
            <main className={classes.content}>
                <Container className={classes.center}>
                    <Paper className={classes.map}>
                        <Mapbox/>
                    </Paper>
                </Container>
            </main>
        </div>
        </ThemeProvider>
    );
}