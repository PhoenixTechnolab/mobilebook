import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { StyleProvider } from "native-base";
import ReduxThunk from "redux-thunk";
import combineReducers from "./reducer";
import AppContainer from "./routes/Routes";
import { setI18nConfig } from "./locales";
import getTheme from "../native-base-theme/components";
import platform from "../native-base-theme/variables/platform";
import rebookTheme from "../native-base-theme/variables/rebookLight";

const store = createStore(combineReducers, {}, applyMiddleware(ReduxThunk));
setI18nConfig();
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(rebookTheme)}>
          <AppContainer />
        </StyleProvider>
      </Provider>
    );
  }
}
