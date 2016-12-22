import { shallow } from 'enzyme'
import { expect } from 'chai'
import App from '../../../common/components/app'

describe('<App />', () => {
  it('renders', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).to.have.length(1)
  })
});
