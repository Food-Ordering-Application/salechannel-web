import {BrowserRouter} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core";

import IndexComponent from "./pages";
import theme from "./asserts/Theme";
import {Provider} from "react-redux";
import store from "./store";
import StyledSnackbar from "./features/common/Snackbar/StyledSnackbar";


export default function App() {

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <IndexComponent/>
          <StyledSnackbar/>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}