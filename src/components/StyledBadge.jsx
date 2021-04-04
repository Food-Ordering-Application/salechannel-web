import {Badge, withStyles} from "@material-ui/core";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 3,
    top: 3,
    border: `2px solid ${theme.palette.surface.light}`,
    padding: '0 4px',
    fontFamily: theme.font.family,
    fontWeight: 600,
    fontSize: '11px',
    lineHeight: '11px',
    letterSpacing: '0.4px',
    color: theme.palette.surface.light,
  },
}))(Badge);

export default StyledBadge;