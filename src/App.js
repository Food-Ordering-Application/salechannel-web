import {BrowserRouter} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core";

import IndexComponent from "./pages";
import theme from "./asserts/Theme";
import {Provider} from "react-redux";
import store from "./store";
import StyledSnackbar from "./features/common/Snackbar/StyledSnackbar";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import SplashScreen from "./features/common/SplashScreen";


export default function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)} loading={<SplashScreen/>}>
          <BrowserRouter>
            <IndexComponent/>
            <StyledSnackbar/>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </MuiThemeProvider>
  );
}