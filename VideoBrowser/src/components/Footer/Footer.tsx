import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
 
const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1.2,
    paddingBottom: theme.spacing.unit * 1.2,
    textAlign: 'center'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 2,
    padding: `${theme.spacing.unit * 4}px 0`
  },
  typography: {
    fontSize: '12px' 
  }
});
 
function Footer(props) {
  const { classes } = props;
 
  return (
    <footer className={classes.footer}>
      <Paper className={classes.root} elevation={1}>
        <Typography className={classes.typography}>
          Video browser v0.0.1 @2019
        </Typography>
      </Paper>
    </footer>
  );
}
 
export default withStyles(styles)(Footer);