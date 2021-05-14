import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: `100%`,
    height: `100vh`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    padding: theme.spacing(0),
    margin: theme.spacing(0),
  },
  image: {
    maxWidth: `100%`,
    maxHeight: `100vh`,
  },
}))

export default function SplashScreen() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <img className={classes.image}
             alt="Splash Screen"
             src="https://i.pinimg.com/originals/e6/13/21/e613212546d6c27600379a26cd601365.gif"/>
      </div>
    </div>
  )
}