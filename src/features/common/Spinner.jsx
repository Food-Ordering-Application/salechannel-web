import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

export default function Spinner({size = 24, ...props}) {
  const classes = useStylesFacebook();

  return (
    <CircularProgress
      variant="indeterminate"
      disableShrink
      className={classes.top}
      classes={{
        circle: classes.circle,
      }}
      size={size}
      thickness={4}
      {...props}
    />
  );
}