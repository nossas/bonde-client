import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Mobilization from '../.';
import '../styles/main'

const App = () => {
  return (
    <div>
      <Mobilization />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
