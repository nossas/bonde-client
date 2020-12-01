import React from 'react';
import styled from 'styled-components';
import {
  Button,
  ConnectedForm,
  InputField,
  Validators,
  Text,
  Icon,
  toast
} from 'bonde-components';
import { useTranslation } from 'react-i18next';
import { useMutation, useSession, gql } from 'bonde-core-tools';
import Panel from '../Panel';
import SelectField from '../../../components/SelectField';

const InlineFormWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 500px)) 200px;
  align-items: center;
  grid-column-gap: 20px;
  & div:nth-child(2) {
    margin-right: 35px;
  }
`;

const Inline = styled.div`
  display: flex;
  flex-direction: row;

  svg {
    margin-right: 15px;
  }
`;

export const InviteMutation = gql`
  mutation SendInvitation ($input: InvitationInput) {
    send_invitation(input: $input) {
      user_id
      id
      role
      created_at
      updated_at
      community {
        id
        name
      }
      code
    }
  }
`;

type Values = {
  email: string
  role: number
}

type Props = {
  onSuccess: (values: any) => Promise<any> | any
  isCommunityAdmin: boolean
}

const InviteForm = ({ onSuccess, isCommunityAdmin }: Props) => {
  const [invite] = useMutation(InviteMutation);
  const { user, community } = useSession();
  const { t } = useTranslation('community');
  const { composeValidators, required, isEmail } = Validators;

  if (community) {
    return (
      <Panel style={{ marginTop: '24px' }}>
        {isCommunityAdmin ? (
          <ConnectedForm
            initialValues={{ role: 2 }}
            onSubmit={async ({ email, role }: Values) => {
              const input: any = {
                community_id: community.id,
                email,
                role: Number(role),
                user_id: user.id
              };

              try {
                const { data } = await invite({ variables: { input } });

                onSuccess(data.send_invitation)
                  .then(() => {
                    toast(t('mobilizers.form.success'), { type: toast.TYPE.SUCCESS });
                  })
              } catch ({ graphQLErrors, ...errors }) {
                if (graphQLErrors.filter((err: any) => err.extensions.code === 'permission-error').length > 0) {
                  toast(t('mobilizers.form.permission-denied'), { type: toast.TYPE.ERROR })
                } else {
                  console.error({ graphQLErrors, ...errors })
                }
              }
            }}
          >
            {({ submitting, dirty }: any) => (
              <InlineFormWrap>
                <InputField
                  name='email'
                  label={t('mobilizers.form.fields.email.label')}
                  placeholder={t('mobilizers.form.fields.email.placeholder')}
                  validate={
                    composeValidators(
                      required(t('mobilizers.form.fields.email.errors.required')),
                      isEmail(t('mobilizers.form.fields.email.errors.isEmail'))
                    )
                  }
                />
                <SelectField name='role' label={t('mobilizers.form.fields.role.label')}>
                  <option value={1}>{t('mobilizers.form.fields.role.option1')}</option>
                  <option value={2}>{t('mobilizers.form.fields.role.option2')}</option>
                </SelectField>
                <Button type='submit' disabled={submitting || !dirty}>{t('mobilizers.form.buttons.invite')}</Button>
              </InlineFormWrap>
            )}
          </ConnectedForm>
        ) : (
          <Inline>
            <Icon name='InfoMsg' />
            <Text>{t('mobilizers.form.permission-info')}</Text>
          </Inline>
        )}
      </Panel>
    );
  }

  return <h2>Community Not Found!</h2>;
};

export default InviteForm;