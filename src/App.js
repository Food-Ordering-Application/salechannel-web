import {BrowserRouter} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core";

import IndexComponent from "./pages";
import theme from "./asserts/Theme";


export default function App() {

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <IndexComponent/>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}