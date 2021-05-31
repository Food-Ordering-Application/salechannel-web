import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import {ChevronRight} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import Ribbon from "../../../common/Ribbon";
import Skeleton from "react-loading-skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5, 0),
  },
  icon: ({disabled}) => ({
    fontSize: 24,
    color: disabled ? `transparent` : theme.palette.onSurface.mediumEmphasis,
    display: `flex`,
  }),
  label: {
    fontSize: `14px`,
    color: theme.palette.onSurface.highEmphasis,
  },
  value: {
    fontSize: `14px`,
    color: theme.palette.onSurface.mediumEmphasis,
  },
  action: {
    fontSize: `14px`,
    color: theme.palette.primary.main,
  },
}))

export default function InfoItem({label, value, leftNode, appendInner, actionLabel, isLoading, disabled, onClick}) {
  const classes = useStyles({disabled});

  return (
    <Ribbon onClick={onClick} disabled={disabled} component="span">
      <Grid container spacing={1} alignItems="center" className={classes.root}>
        <Grid item xs>
          <Box hidden={leftNode}>
            <Typography variant="h4">
              <Box className={classes.label}>{label}</Box>
            </Typography>
          </Box>
          {leftNode}
        </Grid>
        <Grid item hidden={isLoading}>
          <Box>
            <Box>
              <Typography variant="h4">
                <Box className={classes.value}>{value}</Box>
              </Typography>
            </Box>
          </Box>
          <Box hidden={value}>
            <Typography variant="h4">
              <Box className={classes.action}>{actionLabel || `Nhập ngay`}</Box>
            </Typography>
          </Box>
        </Grid>
        <Grid item hidden={!isLoading}>
          <Skeleton height={16} width={"40vw"}/>
        </Grid>
        <Grid item>
          {appendInner || <Box className={classes.icon} component={ChevronRight}/>}
        </Grid>
      </Grid>
    </Ribbon>
  );
}