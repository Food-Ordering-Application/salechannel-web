import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid, Typography} from "@material-ui/core";
import {RadioButtonChecked, RadioButtonUnchecked} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    fontSize: theme.spacing(1.25),
    color: theme.palette.onSurface.highEmphasis,
  },
  disabledText: {
    fontSize: theme.spacing(1.25),
    color: theme.palette.onSurface.disabled,
  },
}));

const mockedData = [
  {
    text: "Đang kiểm tra",
    time: ""
  },
  {
    text: "Đang chuẩn bị",
    time: "",
  },
  {
    text: "Đang giao hàng",
    time: "",
  },
  {
    text: "Đã giao hàng",
    time: ""
  }
];

export default function ProcessingBar({step}) {
  const classes = useStyles();

  return (
    <Grid container justify="space-around" alignItems="flex-end">
      {mockedData.map((data, index) => (
        <Grid item key={index}>
          <Box>
            <Typography variant="h6">
              <Box className={classes.text}>{data.time}</Box>
            </Typography>
            <Box color="secondary" component={index < step ? RadioButtonChecked : RadioButtonUnchecked}/>
            <Typography variant="h6">
              <Box className={classes.text}>{data.text}</Box>
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}