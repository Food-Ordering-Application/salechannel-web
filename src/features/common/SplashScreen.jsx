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
    zIndex: 5,
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
                 "https://i.pinimg.com/originals/e6/13/21/e613212546d6c27600379a26cd601365.gif" :
                 "https://ckbox.net/static/media/loading.50cd3412.gif"
             }
        />
      </div>
    </div>
  )
}