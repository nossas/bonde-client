import React from 'react'
import { oneOfType, string, func, node } from 'prop-types'
import { Flexbox2 as Flexbox, Title, Spacing } from 'bonde-styleguide'

const GadgetTitle = ({ children }) => (
  <Title.H5 uppercase fontWeight='bold'>
    {children}
  </Title.H5>
)

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
  title: string,
  renderFilter: func,
  WrapperComponent: oneOfType([node, func])
}

Gadget.Title = GadgetTitle

export default Gadget
