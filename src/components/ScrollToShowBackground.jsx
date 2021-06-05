import React from "react";
import {useScrollTrigger} from "@material-ui/core";

export default function ScrollToShowBackground({children, window}) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    style: {
      background: trigger ? `white` : `linear-gradient(0, transparent, #00000099)`,
      color: trigger ? `black` : `white`,
      transitionDuration: `0.357s`,
      transitionTimingFunction: `ease-in-out`,
      boxShadow: trigger ? `0px 4px 7px 0px rgb(0 0 0 / 5%)` : `none`,
    }
  });
}