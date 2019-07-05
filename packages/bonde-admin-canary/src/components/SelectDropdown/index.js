import React from 'react'
import { any, oneOfType, arrayOf, shape, string, number, node, func } from 'prop-types'
import { Dropdown, DropdownItem } from 'bonde-styleguide'

class SelectDropdown extends React.Component {
  state = {
    value: undefined
  }

  onChange = currentOption => {
    this.setState({ currentOption })
    this.props.onChange(currentOption)
  }

  render () {
    const { initialValue, options } = this.props
    let { value } = this.state
    if (!value) {
      value = initialValue || options[0].value
    }

    const currentOption = options.find(opt => opt.value === value)

    return (
      <Dropdown label={currentOption.label} inverted>
        {options.map(option => (
          <DropdownItem
            key={Math.random()}
            onClick={() => {
              if (currentOption.value !== option.value) {
                this.onChange(option)
              }
            }}
          >
            {option.label}
          </DropdownItem>
        ))}
      </Dropdown>
    )
  }
}

const optionShape = shape({
  label: oneOfType([node, func, string]),
  value: oneOfType([string, number])
})

SelectDropdown.propTypes = {
  options: arrayOf(optionShape).isRequired,

  onChange: func,
  initialValue: any
}

SelectDropdown.defaultProps = {
  onChange: f => f
}

export default SelectDropdown
