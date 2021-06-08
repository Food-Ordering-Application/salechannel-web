import React, {useState} from "react";
import {Box, Chip, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ProcessingBar from "./ProcessingBar";
import ConfirmCancelOrderDialog from "./ConfirmCancelOrderDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    boxShadow: theme.effect.dp10.boxShadow,
  },
  status: {
    fontSize: theme.spacing(1.5),
    color: theme.palette.onSurface.mediumEmphasis,
  },
  action: {
    fontSize: theme.spacing(2.25),
    color: theme.palette.onSurface.highEmphasis,
  },

}));

export default function StatusCard({statusText, actionText, step, onCancel}) {
  const classes = useStyles();
  const [dlConfirm, setConfirmOpen] = useState(false);


  return (
    <Paper className={classes.root}>
      <Box p={1.5} textAlign="center">
        <Typography variant="h4">
          <Box className={classes.status}>{statusText}</Box>
        </Typography>
        <Typography variant="h3">
          <Box className={classes.action}>{actionText}</Box>
        </Typography>
        {
          step < 2 && (<Box mt={1}>
            <Chip
              variant={`outlined`}
              size={`small`}
              label={`Hủy đơn`}
              onClick={() => setConfirmOpen(true)}
            />
          </Box>)
        }
        <Box py={4}>
          <ProcessingBar step={step}/>
        </Box>
      </Box>
      <ConfirmCancelOrderDialog
        open={dlConfirm}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => onCancel()}
      />
    </Paper>
  );
}