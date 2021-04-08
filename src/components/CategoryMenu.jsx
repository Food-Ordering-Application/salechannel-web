import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Dialog, DialogContent, Fab, List, ListItem, ListItemText, Slide, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {},
    contentRoot: {
      padding: 0,
      "&:first-child": {
        padding: 0,
      }
    },
    dialog: {
      width: `75%`,
      borderRadius: theme.spacing(1),
      margin: theme.spacing(2),
      alignSelf: `flex-end`,
    },
    item: {
      display: `flex`,
    },
    label: {
      fontSize: theme.spacing(2),
      lineHeight: `${theme.spacing(2.5)}px`,
      flexGrow: 1,
    },
    count: {
      fontSize: theme.spacing(2),
      lineHeight: `${theme.spacing(2.5)}px`,
    },
  })
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} timeout={{enter: 450, exit: 650}}/>;
});

export default function CategoryMenu({categoryList}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleItemClick = (index) => {
    document.getElementById(`category${index}`).scrollIntoView({
      behavior: `smooth`,
      block: `center`,
      inline: `center`,
    });
    setTimeout(() => handleClose(), 1000);
  };

  return (
    <>
      <Fab color="secondary" variant="extended" onClick={() => handleClickOpen()}>
        <Menu/>Menu
      </Fab>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        classes={{paper: classes.dialog}}
      >
        <DialogContent className={classes.contentRoot}>
          <List>
            {
              categoryList.map((data, index) => (
                <ListItem button divider onClick={() => handleItemClick(index)} key={index}>
                  <ListItemText>
                    <Box className={classes.item}>
                      <Typography component="div" variant="h4" className={classes.label}>{data.name}</Typography>
                      <Typography component="div" variant="h4" className={classes.count}>{data.count}</Typography>
                    </Box>
                  </ListItemText>
                </ListItem>
              ))
            }
          </List>
        </DialogContent>
      </Dialog>
    </>
  )
}