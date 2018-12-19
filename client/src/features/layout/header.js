import React from "react";
import { Link } from "react-router-dom";
//components
import HeaderContent from "./headerContent";
// UI
import styles from "./header.style";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classNames";
import { Grid } from "@material-ui/core";

const Header = ({ classes, isFullHeader }) => {
  return (
    <Grid
      container
      wrap="wrap"
      alignItems="flex-start"
      className={classNames({
        [classes.root]: true,
        [classes.fullHeader]: isFullHeader
      })}
    >
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Code Core
          </Typography>

          <Link to="/home" className={classes.link}>
            <Button color="inherit">Home</Button>
          </Link>

          <Link to="/login" className={classes.link}>
            <Button color="inherit">Login</Button>
          </Link>

          <Link to="/dashboard" className={classes.link}>
            <Button color="inherit">Dashboard</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <HeaderContent isVisible={isFullHeader} />
    </Grid>
  );
};

export default withStyles(styles)(Header);
