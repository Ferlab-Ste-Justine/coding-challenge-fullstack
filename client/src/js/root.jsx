import { orange } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './containers/appContainer';
import configureStore from './redux/configureStore';

const store = configureStore();
const theme = createMuiTheme({
  status: {
    danger: orange[500]
  }
});

export default function Root() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    </Provider>
  );
}
