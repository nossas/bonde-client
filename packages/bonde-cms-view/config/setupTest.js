/* eslint-env browser */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// browser
const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<body></body>`);

global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;
