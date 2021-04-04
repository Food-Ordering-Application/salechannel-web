import React from "react";
import {AppBar, makeStyles, Toolbar} from "@material-ui/core";
import {ChevronRight} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    appBar: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0px 4px 7px 0px rgb(0 0 0 / 5%)',
    },
    toolBar: {
      minHeight: theme.spacing(5),
    },
    logo_root: {
      verticalAlign: 'text-bottom',
    },
    logo1: {
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.surface.dark,
      fontWeight: '800',
      letterSpacing: `-0.25px`,
      fontSize: '15px',
    },
    logo2: {
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.primary.main,
      fontWeight: '800',
      letterSpacing: `-0.25px`,
      fontSize: '17px',
    },
    address: {
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.surface.dark,
      fontWeight: '600',
      letterSpacing: `-0.25px`,
      fontSize: '12px',
      textAlign: 'right',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginLeft: theme.spacing(2),
      flexGrow: 1,
    },
    indicator: {
      color: theme.palette.primary.main,
    },
  })
);

export default function AddressSelector({address}) {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <span className={classes.logo1}>Smart</span>
        <span className={classes.logo2}>FOOD</span>
        <span className={classes.address}>{address}</span>
        <ChevronRight className={classes.indicator}/>
      </Toolbar>
    </AppBar>
  );
}