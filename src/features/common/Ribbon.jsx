import {ButtonBase, withStyles} from "@material-ui/core";

const Ribbon = withStyles((theme) => ({
  root: ({p = 0}) => ({
    padding: theme.spacing(p),
    display: 'block',
    textAlign: `start`,
    width: `100%`,
    textDecoration: `none`,
  })
}))(ButtonBase);

export default Ribbon;