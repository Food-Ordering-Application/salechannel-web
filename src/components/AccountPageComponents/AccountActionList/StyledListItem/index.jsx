import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {ChevronRight} from "@material-ui/icons";


const useStyles = makeStyles(theme => ({
  icon: {
    margin: `auto`,
    color: theme.palette.onSurface.highEmphasis,
    fontSize: theme.spacing(2.5),
  },
  label: {
    color: `${theme.palette.onSurface.mediumEmphasis}`,
    fontSize: theme.spacing(1.375),
  },
  chevronRight: {
    margin: theme.spacing(0, 1, 0, `auto`),
    color: theme.palette.onSurface.highEmphasis,
    fontSize: theme.spacing(2.5),
  },
}));


export default function StyledListItem({icon, label, to}) {
  const classes = useStyles();

  return (
    <ListItem button divider disableGutters component={Link} to={to}>
      <ListItemIcon>
        <Box component={icon} className={classes.icon}/>
      </ListItemIcon>
      <ListItemText disableTypography>
        <Typography variant="h6">
          <Box className={classes.label}>{label}</Box>
        </Typography>
      </ListItemText>
      <ListItemIcon>
        <ChevronRight className={classes.chevronRight}/>
      </ListItemIcon>
    </ListItem>
  )
}