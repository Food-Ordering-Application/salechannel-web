import {LinearProgress, withStyles} from "@material-ui/core";

const PendingBar = withStyles((theme) => ({
  root:{
    backgroundColor: `transparent`,
    height: theme.spacing(1.5),
  },
  bar:{
    backgroundColor: `#985EFF`,
    height: theme.spacing(0.075),
    boxShadow: `0 -1px 8px 1px #6200EE`,
  }
}))(LinearProgress);

export default PendingBar;