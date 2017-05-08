import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { Background } from '~client/components/layout'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  FormError
} from '~client/components/forms'
import * as paths from '~client/paths'

class CommunityNewPage extends Component {
  componentWillReceiveProps (nextProps) {
    const { submitting } = this.props
    if (submitting && !nextProps.submitting && !nextProps.submitFailed) {
      browserHistory.push(paths.communityList())
    }
  }

  render () {
    const {
      fields: { name, city },
      // Actions
      asyncCreate,
      ...formProps
    } = this.props
    return (
      <Background>
        <h1>Crie uma comunidade</h1>
        <h2>Comunidades do Bonde são grupos de ação que trabalham juntos por uma causa.</h2>
        <FormRedux
          nosubmit
          className='bg-white rounded'
          onSubmit={values => asyncCreate(values)}
          {...formProps}
        >
          <FormGroup controlId='nameId' {...name}>
            <ControlLabel>Nome da comunidade</ControlLabel>
            <FormControl type='text' placeholder='Exemplo: Movimento 90º São Paulo' />
          </FormGroup>
          <FormGroup controlId='cityId' {...city}>
            <ControlLabel>Cidade da comunidade</ControlLabel>
            <FormControl type='text' placeholder='Exemplo: São Paulo' />
          </FormGroup>
          <Button type='submit' className='btn py2 caps white col-12 rounded-bottom bg-pagenta'>
            {formProps.submitting ? 'Salvando...' : 'Criar comunidade'}
          </Button>
          <FormError className='mt2' />
        </FormRedux>
      </Background>
    )
  }
}

CommunityNewPage.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.object,
    city: PropTypes.object
  }).isRequired,
  submitting: PropTypes.bool,
  // Actions
  asyncCreate: PropTypes.func.isRequired
}

export default CommunityNewPage
