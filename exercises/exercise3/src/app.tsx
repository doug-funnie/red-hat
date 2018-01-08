import { ThemeProvider } from 'glamorous';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { create as createStore } from 'store';
import { Profile } from './pages/profile';
import { Users } from './pages/users';
import { getUserProfileRoute, getUsersRoute } from './routeUtil';
import { theme } from './styles/theme';

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path={getUsersRoute()} component={Users} />
            <Route exact path={getUserProfileRoute()} component={Profile} />
            <Redirect from='/' to={getUsersRoute()} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default hot(module)(App);
