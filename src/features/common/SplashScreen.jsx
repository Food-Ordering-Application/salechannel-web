import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: ({display}) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    display: display ? `flex` : `none`,
    alignItems: `center`,
    justifyContent: `center`,
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    zIndex: 0.5,
  }),
  image: {
    maxWidth: `100%`,
    maxHeight: `100vh`,
  },
}))

export default function SplashScreen({style = 1, display = 1}) {
  const classes = useStyles({display});

  return (
    <div className={classes.container}>
      <div>
        <img className={classes.image}
             alt="Splash Screen"
             src={
               style === 1 ?
                 `${process.env.PUBLIC_URL}/splash1.gif` :
                 `${process.env.PUBLIC_URL}/splash2.gif`
             }
        />
      </div>
    </div>
  )
}