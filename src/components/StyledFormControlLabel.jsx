import {FormControlLabel, withStyles} from "@material-ui/core";


const StyledFormControlLabel = withStyles(theme => ({
  root:{
    marginRight: 0,
  },
  label: {
    width: `100%`,
  },
}))(FormControlLabel);


export default StyledFormControlLabel;