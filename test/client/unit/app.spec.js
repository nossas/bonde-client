import { expect } from 'chai'
import rendered from 'react-test-renderer'
import App from '../../../common/components/app'

jest.mock('aphrodite/lib/inject');

describe('<App />', () => {
  it('renders', () => {
    const wrapper = rendered.create(<App />)
    expect(wrapper).to.be.ok
  })
});
