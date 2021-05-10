import React from "react";
import {Box, IconButton, Typography} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";

export default function QuantityButtonGroup({value = 1, onChange}) {

  const handleIncrement = () => onChange(value + 1);
  const handleDecrement = () => onChange(value - 1);

  return (
    <Box display="flex" flexDirection="row">
      <Box bgcolor="secondary.l0" color="onSurface.default" borderRadius="50%">
        <IconButton onClick={handleDecrement} size="medium" color="inherit" disabled={value <= 1}>
          <Remove/>
        </IconButton>
      </Box>
      <Box mx={3} display="flex" alignItems="center" color={"onSurface.highEmphasis"}>
        <Typography variant="h4" color="inherit">{value}</Typography>
      </Box>
      <Box bgcolor="primary.main" color="onPrimary.highEmphasis" borderRadius="50%">
        <IconButton onClick={handleIncrement} color="inherit">
          <Add/>
        </IconButton>
      </Box>
    </Box>
  );
}