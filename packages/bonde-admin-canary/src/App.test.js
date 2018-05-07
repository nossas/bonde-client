import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

test('renders without crashing', t => {
  const node = shallow(<App />);
  t.is(node.find('.App').length, 1);
});
