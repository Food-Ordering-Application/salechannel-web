import {BottomNavigationAction, withStyles} from "@material-ui/core";


const StyledBottomNavigationAction = withStyles((theme) => ({
  root: {
    minWidth: 'max-content',
    height: 'fit-content',
    padding: '0px',
  },
  selected: {},
  label: {
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '10px',
    lineHeight: '20px',
    letterSpacing: '0.4px',
    '&$selected': {
      fontSize: '12px',
    }
  },
}))(BottomNavigationAction);


export default StyledBottomNavigationAction;