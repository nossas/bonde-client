import React from 'react';
import Router from 'react-router';
import createRoutes from './views/createRoutes';
import { Provider } from 'react-redux';

const getFetchData = (component = {}) => {
  return component.WrappedComponent ?
    getFetchData(component.WrappedComponent) :
    component.fetchData;
};

export function createTransitionHook(store, host) {
  return (nextState, transition, callback) => {
    const { params, location: { query } } = nextState;
    const promises = nextState.branch
      .map(route => route.component)                          // pull out individual route components
      .filter((component) => getFetchData(component))         // only look at ones with a static fetchData()
      .map(getFetchData)                                      // pull out fetch data methods
      .map(fetchData => fetchData(store, params, query || {}, host));  // call fetch data methods and save promises
    Promise.all(promises)
      .then(() => {
        callback(); // can't just pass callback to then() because callback assumes first param is error
      }, (error) => {
        callback(error);
      });
  };
}

export default function universalRouter(location, history, store, host) {
  const routes = createRoutes(store, host)
  return new Promise((resolve, reject) => {
    Router.run(routes, location, [createTransitionHook(store, host)], (error, initialState, transition) => {
      if (error) {
        return reject(error);
      }

      if (transition && transition.redirectInfo) {
        return resolve({
          transition,
          isRedirect: true
        });
      }

      if (history) {  // only on client side
        initialState.history = history;
      }

      const component = (
        <Provider store={store} key="provider">
          <Router {...initialState} children={routes}/>
        </Provider>
      );

      return resolve({
        component,
        isRedirect: false
      });
    });
  });
}
