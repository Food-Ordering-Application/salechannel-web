import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Card, Divider, Typography} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    container: {
      // margin: theme.spacing(0.75, 0),
    },
    root: {
      height: `max-content`,
      display: `flex`,
      flexDirection: `row`,
      alignItems: `center`,
      padding: theme.spacing(1.5, 1),
      // boxShadow: theme.effect.dp08.boxShadow,
      '&:first-child': {
        marginTop: 0,
      },
    },
    labelRoot: {
      flexGrow: 1,
    },
    labelText: {
      fontSize: theme.spacing(1.5),
      lineHeight: `${theme.spacing(1.5)}px`,
      letterSpacing: `0.4px`,
    },
    chevron: {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
  })
);

export default function CategoryLabel({children, open, onClick}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.root} onClick={onClick} elevation={0}>
        <Typography variant="h4" className={classes.labelRoot}>
          <Box className={classes.labelText}>{children}</Box>
        </Typography>
        {open ? <ExpandLess className={classes.chevron}/> : <ExpandMore className={classes.chevron}/>}
      </Card>
      <Divider variant="fullWidth"/>
    </div>
  );
}