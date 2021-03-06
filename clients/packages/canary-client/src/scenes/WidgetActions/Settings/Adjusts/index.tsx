import React from 'react';
import { InputField, Tooltip } from 'bonde-components';
import { useTranslation } from 'react-i18next';
import Panel from '../../../../components/Panel';
import ColorField from '../../../../components/ColorField';
import SettingsForm from '../SettingsForm';

const AdjustsFields = ({ widget }: any) => {
  const { t } = useTranslation('widgetActions');

  return (
    <SettingsForm
      widget={widget}
      initialValues={{
        settings: widget.settings
      }}
    >
      {() => (
        <Panel>
          <InputField
            name='settings.call_to_action'
            label={t('settings.adjusts.fields.call_to_action.label')}
            placeholder={t('settings.adjusts.fields.call_to_action.placeholder')}
          />
          <InputField
            name='settings.button_text'
            label={t('settings.adjusts.fields.button_text.label')}
            placeholder={t('settings.adjusts.fields.button_text.placeholder')}
          />
          <InputField
            name='settings.count_text'
            label={
              <Tooltip
                label={t('settings.adjusts.fields.count_text.label')}
                info={t('settings.adjusts.fields.count_text.tooltip')}
              />
            }
            placeholder={t('settings.adjusts.fields.count_text.placeholder')}
          />
          <ColorField
            name='settings.main_color'
            label={
              <Tooltip
                label={t('settings.adjusts.fields.main_color.label')}
                info={t('settings.adjusts.fields.main_color.tooltip')}
              />
            }
          />
        </Panel>
      )}
    </SettingsForm>
  );
}

export default AdjustsFields;