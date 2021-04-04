import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
  //Spacing Styles
  spacing: 8,

  // Text Styles
  typography: {
    h1: {
      fontFamily: `Poppins`,
      fontStyle: `normal`,
      fontWeight: 300,
      fontSize: `96px`,
      lineHeight: `112px`,
      letterSpacing: `-1.5px`,
      color: `#c4c4c4`,
    },
    h2: {
      fontFamily: `Poppins`,
      fontStyle: `normal`,
      fontWeight: 300,
      fontSize: `60px`,
      lineHeight: `72px`,
      letterSpacing: `-0.5px`,
      color: `#c4c4c4`,
    },
    h3: {
      fontFamily: `Roboto`,
      fontStyle: `normal`,
      fontWeight: `normal`,
      fontSize: `48px`,
      lineHeight: `56px`,
      color: `#c4c4c4`,
    },
    h4: {
      fontFamily: `Poppins`,
      fontStyle: `normal`,
      fontWeight: `normal`,
      fontSize: `34px`,
      lineHeight: `36px`,
      color: `#c4c4c4`,
    },
    h5: {
      fontFamily: `Roboto`,
      fontStyle: `normal`,
      fontWeight: `normal`,
      fontSize: `24px`,
      lineHeight: `24px`,
      letterSpacing: `0.18px`,
      color: `#c4c4c4`,
    },
    h6: {
      fontFamily: `Poppins`,
      fontStyle: `normal`,
      fontWeight: `normal`,
      fontSize: `20px`,
      lineHeight: `24px`,
      letterSpacing: `0.15px`,
      color: `#c4c4c4`,
    },
    subtitle1: {
      fontFamily: `Roboto`,
      fontStyle: `normal`,
      fontWeight: `normal`,
      fontSize: `16px`,
      lineHeight: `24px`,
      letterSpacing: `0.15px`,
      color: `#c4c4c4`,
    },
    subtitle2: {
      fontFamily: `Poppins`,
      fontStyle: `normal`,
      fontWeight: `normal`,
      fontSize: `14px`,
      lineHeight: `24px`,
      letterSpacing: `0.1px`,
      color: `#c4c4c4`,
    },
    body1: {
      fontFamily: `Roboto`,
      fontStyle: `normal`,
      fontWeight: `normal`,
      fontSize: `16px`,
      lineHeight: `24px`,
      letterSpacing: `0.5px`,
      color: `#c4c4c4`,
    },
    body2: {
      fontFamily: `Poppins`,
      fontStyle: `normal`,
      fontWeight: `normal`,
      fontSize: `14px`,
      lineHeight: `20px`,
      letterSpacing: `0.25px`,
      color: `#c4c4c4`,
    },
    button: {
      fontFamily: `Roboto`,
      fontStyle: `normal`,
      fontWeight: 500,
      fontSize: `14px`,
      lineHeight: `16px`,
      letterSpacing: `1.25px`,
      textTransform: `uppercase`,
      color: `#c4c4c4`,
    },
    caption: {
      fontFamily: `Poppins`,
      fontStyle: `normal`,
      fontWeight: 500,
      fontSize: `12px`,
      lineHeight: `16px`,
      letterSpacing: `0.4px`,
      color: `#c4c4c4`,
    },
    overline: {
      fontFamily: `Poppins`,
      fontStyle: `normal`,
      fontWeight: 500,
      fontSize: `10px`,
      lineHeight: `16px`,
      letterSpacing: `1.5px`,
      textTransform: 'uppercase',
      color: `#c4c4c4`,
    },
    fontFamily: [`Poppins`, `Roboto`].join(`,`),
  },

  //Color Styles
  palette: {
    primary: {
      main: `#FF6B35`,
      l9: `#FF6B35`,
      l8: `#FD723F`,
      l7: `#FF7B4B`,
      l6: `#FF8154`,
      l5: `#FF885E`,
      l4: `#FF9670`,
      l3: `#FF9A75`,
      l2: `#FFAF92`,
      l1: `#FFBDA5`,
      l0: `#FFD6C8`,
    },
    secondary: {
      main: '#23036A',
      l9: `#23036A`,
      l8: `#30009C`,
      l7: `#3700B3`,
      l6: `#5600E8`,
      l5: `#6200EE`,
      l4: `#7F39FB`,
      l3: `#985EFF`,
      l2: `#BB86FC`,
      l1: `#DBB2FF`,
      l0: `#F2E7FE`,
    },
    error: {
      main: '#B00020',
    },
    onSurface: {
      default: 'rgba(0, 0, 0, 1)',
      highEmphasis: 'rgba(0, 0, 0, 0.87)',
      mediumEmphasis: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    onPrimary: {
      highEmphasis: `#FFFFFF`,
      mediumEmphasis: `rgba(255, 255, 255, 0.74)`,
      disabled: `rgba(255, 255, 255, 0.38)`,
    },
    stateBlackOverlay: {
      hover: `rgba(0, 0, 0, 0.04)`,
      focused: `rgba(0, 0, 0, 0.12)`,
      pressed: `rgba(0, 0, 0, 0.1)`,
      dragged: `rgba(0, 0, 0, 0.08)`,
      selected: `rgba(0, 0, 0, 0.08)`,
    },
    statePrimaryOverlay: {
      hover: `rgba(98, 0, 238, 0.04)`,
      focused: `rgba(98, 0, 238, 0.12)`,
      pressed: `rgba(98, 0, 238, 0.1)`,
      dragged: `rgba(98, 0, 238, 0.08)`,
      selected: `rgba(98, 0, 238, 0.08)`,
    },
    stateWhiteOverlay: {
      hover: `rgba(255, 255, 255, 0.04)`,
      focused: `rgba(255, 255, 255, 0.12)`,
      pressed: `rgba(255, 255, 255, 0.1)`,
      dragged: `rgba(255, 255, 255, 0.08)`,
      selected: `rgba(255, 255, 255, 0.08)`,
    },
    outline: `rgba(0, 0, 0, 0.12)`,
    surface: {
      light: `#FFFFFF`,
      dark: `#000000`,
    },
    surfaceOverlay: `rgba(33, 33, 33, 0.08)`,
    gray: {
      l2: '#4F4F4FFF'
    },
    white: 'rgba(255, 255, 255)',
  },

  //Effect Styles
  effect: {
    dp00: {
      background: `#C4C4C4`,
      boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
    },
    dp01: {
      background: `#C4C4C4`,
      boxShadow: `0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)`,
    },
    dp02: {
      background: `#C4C4C4`,
      boxShadow: `0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)`,
    },
    dp03: {
      background: `#C4C4C4`,
      boxShadow: `0px 3px 4px rgba(0, 0, 0, 0.14), 0px 3px 3px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.2)`,
    },
    dp04: {
      background: `#C4C4C4`,
      boxShadow: `0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)`,
    },
    dp06: {
      background: `#C4C4C4`,
      boxShadow: `0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 3px 5px rgba(0, 0, 0, 0.2)`,
    },
    dp08: {
      background: `#C4C4C4`,
      boxShadow: `0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)`,
    },
    dp09: {
      background: `#C4C4C4`,
      boxShadow: `0px 9px 12px rgba(0, 0, 0, 0.14), 0px 3px 16px rgba(0, 0, 0, 0.12), 0px 5px 6px rgba(0, 0, 0, 0.2)`,
    },
    dp12: {
      background: `#C4C4C4`,
      boxShadow: `0px 12px 17px rgba(0, 0, 0, 0.14), 0px 5px 22px rgba(0, 0, 0, 0.12), 0px 7px 8px rgba(0, 0, 0, 0.2)`,
    },
    dp16: {
      background: `#C4C4C4`,
      boxShadow: `0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)`,
    },
    dp24: {
      background: `#C4C4C4`,
      boxShadow: `0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.12), 0px 11px 15px rgba(0, 0, 0, 0.2)`,
    },
  },

  //Others
  font: {
    letterSpacing: '-0.25px',
  },

});

export default theme;