import React from "react";
// UI
import styles from "./headerContent.style";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import classNames from "classnames";

const HeaderContent = ({ classes }) => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography
        variant="h1"
        color="secondary"
        gutterBottom
        className={classes.width}
      >
        HeaderContent
      </Typography>
      <Typography
        variant="h4"
        color="secondary"
        gutterBottom
        align="center"
        className={classes.width}
      >
        Regardless of whether you are a photography industry professional or
        just a newcomer hobbyist, editing and post-processing your pics on the
        go is now so much easier!
      </Typography>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          Primary
        </Button>
        <Button
          variant="contained"
          size="large"
          className={classNames(classes.button, classes.secondary)}
        >
          Default
        </Button>
      </div>
    </Grid>
  );
};

export default withStyles(styles)(HeaderContent);
