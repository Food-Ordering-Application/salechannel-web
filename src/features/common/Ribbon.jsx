import {ButtonBase, withStyles} from "@material-ui/core";

const Ribbon = withStyles((theme) => ({
  root:{
    display: 'block',
    textAlign: `start`,
    width: `100%`,
    textDecoration: `none`,
  }
}))(ButtonBase);

export default Ribbon;