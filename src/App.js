import {BrowserRouter} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core";

import IndexComponent from "./pages";
import theme from "./asserts/Theme";
import {Provider} from "react-redux";
import store from "./redux/store";
import StyledSnackbar from "./components/StyledSnackbar";


export default function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <IndexComponent/>
          <StyledSnackbar/>
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}