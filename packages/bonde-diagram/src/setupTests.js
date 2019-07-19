/* eslint-env browser */
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// mock png
import requireHacker from 'require-hacker'

Enzyme.configure({ adapter: new Adapter() })

// browser
const { JSDOM } = require('jsdom')
const dom = new JSDOM(`<body></body>`)

global.document = dom.window.document
global.window = dom.window
global.window.focus = () => {}
global.navigator = dom.window.navigator

// localStorage
class LocalStorageMock {
  constructor () {
    this.store = {}
  }

  clear () {
    this.store = {}
  }

  getItem (key) {
    return this.store[key] || null
  }

  setItem (key, value) {
    this.store[key] = value.toString()
  }

  removeItem (key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock()

// Mock XMLHttpRequest
class XMLHttpRequest {
  open () {}
  setRequestHeader () {}
  send () {}
}

global.XMLHttpRequest = XMLHttpRequest

requireHacker.hook('png', () => 'module.exports = ""')
requireHacker.hook('css', () => 'module.exports = ""')
