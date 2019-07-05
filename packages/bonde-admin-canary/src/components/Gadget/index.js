import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, Title, Spacing } from 'bonde-styleguide'

const GadgetTitle = ({ children }) => (
  <Title.H5 uppercase fontWeight='bold'>
    {children}
  </Title.H5>
)

GadgetTitle.propTypes = {
  children: PropTypes.node
}

const Gadget = ({ children, title, renderFilter, WrapperComponent }) => (
  <Flexbox vertical>
    <Spacing margin={{ bottom: 15 }}>
      <Flexbox horizontal spacing='between'>
        {title
          ? <GadgetTitle>{title}</GadgetTitle>
          : <div />
        }
        {renderFilter && renderFilter()}
      </Flexbox>
    </Spacing>

    {WrapperComponent
      ? <WrapperComponent>{children}</WrapperComponent>
      : children
    }
  </Flexbox>
)

Gadget.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  renderFilter: PropTypes.func,
  WrapperComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}

Gadget.Title = GadgetTitle

export default Gadget
