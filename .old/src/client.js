/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Location from 'react-router/lib/Location';
import queryString from 'query-string';
import createStore from './redux/create';
import ApiClient from './ApiClient';
import universalRouter from './universalRouter';
import Raven from 'raven-js'

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  // See: https://github.com/getsentry/raven-js/issues/73
  const ravenOptions = { ignoreErrors: ['WRONG_DOCUMENT_ERR'] }
  const sentryApp = 'https://551d08d954074dddb605f9043706ecd8@app.getsentry.com/86008'
  Raven.config(sentryApp, ravenOptions).install()
} else {
  console.info('Suppress sending errors to sentry when environment is development.');
}

const history = new BrowserHistory();
const client = new ApiClient();

const dest = document.getElementById('content');
const store = createStore(client, window.__data);
const search = document.location.search;
const query = search && queryString.parse(search);
const location = new Location(document.location.pathname, query);
const host = document.location.host

universalRouter(location, history, store, host)
  .then(({component}) => {
    if (__DEVTOOLS__) {
      const DevTools = require('./redux/DevTools')
      console.info(
        'You will see a "Warning: React attempted to reuse markup in a container but the checksum'
          + ' was invalid." message. That\'s because the redux-devtools are enabled.'
        )
      ReactDOM.render(
        <div>
          {component}
          <DevTools store={store} />
        </div>,
        dest
      );
    } else {
      ReactDOM.render(component, dest);
    }
  }, (error) => {
    console.error(error);
  });


if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  const reactRoot = window.document.getElementById('content');

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
