import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    homeButton: {
      marginRight: theme.spacing(2),
    },
    title: {
    },
    push: {
      flexGrow: 1
    }
  }),
);

const NavBar = () => {
  const classes = useStyles({});
  
  return(
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          NavBar
        </Typography>
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <IconButton color="default" className={classes.homeButton}>
            <HomeIcon />
          </IconButton>
        </Link>
        
        <Typography className={classes.push} />
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    </div>
  )
}

export default NavBar;