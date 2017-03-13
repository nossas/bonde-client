import React, { PropTypes } from 'react'

import { SettingsPageLayout, SettingsPageContentLayout } from '~components/layout'
import {
  FormRedux,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  UploadImageField,
  SuccessMessage
} from '~components/forms'
import { FloatLayout } from '~components/grids'
import { SettingsMenu, ForceDownloadViaAjax } from '~community/components'

const CommunitySettingsInfoPage = ({
  fields: { image, name, city, description },
  location,
  community,
  downloadActivists,
  ...formProps
}) => (
  <SettingsPageLayout>
    <SettingsMenu {...{ location }} />
    <SettingsPageContentLayout>
      <FormRedux nosubmit {...formProps}>
        <FormGroup controlId='imageId' {...image}>
          <UploadImageField signingUrl={`${process.env.API_URL}/uploads`} />
        </FormGroup>
        <FormGroup controlId='nameId' {...name}>
          <ControlLabel>Nome</ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='descriptionId' {...description}>
          <ControlLabel>Descrição</ControlLabel>
          <FormControl componentClass='textarea' />
        </FormGroup>
        <FormGroup controlId='cityId' {...city}>
          <ControlLabel>Cidade</ControlLabel>
          <FormControl type='text' />
        </FormGroup>

        <ForceDownloadViaAjax
          title='Baixar resumo de ações dos ativistas'
          onClick={() => downloadActivists(community)}
        />

        <FloatLayout position='floatTopRight'>
          <Button type='submit' className='btn bg-blacker rounded caps white'>
            Salvar
          </Button>
          <SuccessMessage text='Dados editados com sucesso.' />
        </FloatLayout>
      </FormRedux>
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

CommunitySettingsInfoPage.propTypes = {
  fields: PropTypes.shape({
    image: PropTypes.object.isRequired,
    name: PropTypes.object.isRequired,
    city: PropTypes.object.isRequired,
    description: PropTypes.object.isRequired
  }),
  location: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired,
  // Actions
  downloadActivists: PropTypes.func.isRequired
}

export default CommunitySettingsInfoPage
