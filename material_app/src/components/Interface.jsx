import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import CameraIcon from '@material-ui/icons/Camera';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import FileUploadCard from "./pages/FileUploadCard";
import WebcamCard from "./pages/WebcamCard";
import TextBoxCard from "./pages/TextBoxCard";
import Home from "./pages/Home";
import ListS3FilesCard from "./pages/S3Pages/ListS3FilesCard";
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import Button from "@material-ui/core/Button";
import Upload_SendS3Card from "./pages/S3Pages/Upload_SendS3Card";
import BackupIcon from '@material-ui/icons/Backup';
import DownloadS3File from "./pages/S3Pages/DownloadS3File";
import GetAppIcon from '@material-ui/icons/GetApp';
import Divider from '@material-ui/core/Divider';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import PredictImage from "./pages/PredictImage";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: "100%"
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            background: "#5f6fb9",
            color: "#E8F0F2",
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    logo: {
        height: "65px",
        paddingTop: "20px"
    },
    drawerPaper: {
        width: drawerWidth,
        background: "#1e272f",
        color: "#4e89f9",
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        height: "100%",
        backgroundColor: "#161b20",
        paddingTop: "40px",
        color: "#ffffff"
    },
    icons: {
        color: "#4e89f9",
    },
}));

function DrawerNavBar(props) {
    const pageList = [
        {
            name: "Send File",
            path: "/SendFile",
            icon: <SendIcon/>
        },
        {
            name: "Webcam",
            path: "/Webcam",
            icon: <CameraIcon/>
        },
        {
            name: "Text Box",
            path: "/GetTextBox",
            icon: <ListAltRoundedIcon/>
        },
        {
            name: "List S3 Files",
            path: "/listS3Files",
            icon: <StorageRoundedIcon/>
        },
        {
            name: "Send S3 File",
            path: "/sendS3File",
            icon: <BackupIcon/>
        },
        {
            name: "Download S3 File",
            path: "/getS3File",
            icon: <GetAppIcon/>
        },
        {
            name: "Predict Image",
            path: "/predictImage",
            icon: <BlurOnIcon />
        }
    ]
    const [AppBarText, SetAppBarText] = useState("Home")
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);



    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const goHome = () => {
        SetAppBarText("Home")
    }

    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <Typography
                    variant="h2"
                    component="h2"
                    gutterBottom
                    className={classes.title}
                >
                    <Button disableRipple component={Link} to="/" onClick={goHome}>
                        <img src={require('../images/doriLogo.png').default} className={classes.logo}/>
                    </Button>
                </Typography>
            </div>
            <List>
                {pageList.map((item) => (
                    <ListItem
                        button
                        component={Link}
                        to={item.path}
                        onClick={() => SetAppBarText(item.name)}
                        key={item.name}
                        style={{
                            color: 'inherit',
                            textDecoration: 'inherit',
                            borderRadius: "25px",
                        }}>
                        <ListItemIcon className={classes.icons}>{item.icon}</ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">{item.name}</Typography>}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <Router>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h4" noWrap>
                            {AppBarText}
                        </Typography>
                        <IconButton
                            edge="end"
                            aria-label="go to home page"
                            onClick={goHome}
                            color="inherit"
                            component={Link}
                            to="/"
                            style={{
                                marginLeft: "auto"
                            }}
                        >
                            <HomeIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        <Route path="/SendFile">
                            <FileUploadCard urlPath="/sendFile"/>
                        </Route>
                        <Route path="/Webcam" component={WebcamCard} />
                        <Route path="/GetTextBox" component={TextBoxCard} />
                        <Route path="/listS3Files" component={ListS3FilesCard} />
                        <Route path="/sendS3File">
                            <Upload_SendS3Card urlPath="/sendS3File"/>
                        </Route>
                        <Route path="/getS3File" component={DownloadS3File} />
                        <Route path="/predictImage">
                            <PredictImage/>
                        </Route>
                        <Route path="/" component={Home} />
                    </Switch>
                </main>
            </Router>

        </div>
    );
}

export default DrawerNavBar
