import React from "react";
import {Box, IconButton, Typography} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";

export default function QuantityButtonGroup({value = 1, onChange}) {

  const handleIncrement = () => onChange(value + 1);
  const handleDecrement = () => onChange(value - 1);

  return (
    <Box display="flex" flexDirection="row">
      <Box bgcolor="stateBlackOverlay.selected" color="primary.main" borderRadius="25%">
        <IconButton onClick={handleDecrement} size="small" color="inherit" disabled={value <= 1}>
          <Remove/>
        </IconButton>
      </Box>
      <Box mx={2} display="flex" alignItems="center" color="onSurface.highEmphasis">
        <Typography variant="h4" color="inherit">{value}</Typography>
      </Box>
      <Box bgcolor="stateBlackOverlay.selected" color="primary.main" borderRadius="25%">
        <IconButton onClick={handleIncrement} size="small" color="inherit">
          <Add/>
        </IconButton>
      </Box>
    </Box>
  );
}