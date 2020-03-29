import React, { useContext } from 'react';
import './dashboard.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeContext } from '../../contexts/ThemeContext';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Map from '../map';

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
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
      map: {
        borderRadius: '20px'
      },
}));

export default function Dashboard() {
    const classes = useStyles();
    const { isLightTheme, darkTheme, lightTheme } = useContext(ThemeContext);

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
                        <Avatar className={classes.large}>A</Avatar>
                    </Container>
                </div>
                <Divider />
                <List>
                    <ListItem button>
                        <Container>
                            <InboxIcon/>
                        </Container>
                    </ListItem>
                    <ListItem button>
                        <Container>
                            <InboxIcon/>
                        </Container>
                    </ListItem>
                    <ListItem button>
                        <Container>
                            <InboxIcon/>
                        </Container>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button>
                        <Container>
                            <InboxIcon/>
                        </Container>
                    </ListItem>
                    <ListItem button>
                        <Container>
                            <InboxIcon/>
                        </Container>
                    </ListItem>
                    <ListItem button>
                        <Container>
                            <InboxIcon/>
                        </Container>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <Map/>
            </main>
        </div>
        </ThemeProvider>
    );
}