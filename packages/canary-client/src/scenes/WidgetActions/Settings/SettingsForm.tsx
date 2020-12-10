import React from 'react';
import styled from 'styled-components';
import { Button, ConnectedForm, Header, Label, useField, InputField, FormField } from 'bonde-components';

const Radio = styled(({ children, className, name, value }) => {
  const { input } = useField(name);

  return (
    <Label className={className}>
      <input
        type='radio'
        name={input.name}
        checked={input.checked}
        onChange={input.onChange}
        value={value}
      />
      {children}
    </Label>
  );
})`
  margin: 15px 15px 0 0;
`;

const TargetTypeField = ({ name }: any) => {
  return (
    <FormField style={{ marginTop: '15px' }}>
      <Label>Tipo de pressão</Label>
      <div style={{ display: 'flex' }}>
        <Radio name={name} value='unique'>
          Um grupo de alvos   
        </Radio>
        <Radio name={name} value='group'>
          Mais de um grupo de alvos (Ex: Por estado)
        </Radio>
      </div>
    </FormField>
  );
}

const ButtonStyled = styled.button`
  padding: 20px;
  border: 1px solid #eee;
`

const TargetsByGroupFields = () => (
  <>
    <InputField
      name='placheholder'
      label='Nome do campo de seleção'
      placeholder='Ex: Selecione seu estado'
    />
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Label>Adicionar grupo de alvos</Label>
      <ButtonStyled type='button'>{`+ Add grupo de alvos`}</ButtonStyled>
    </div>
  </>
)

const TargetsUniqueFields = ({ name }: any) => (
  <>
    <InputField
      name={name}
      label='Adicionar alvos'
      placeholder='Nome do alvo <nome@alvo.com>'
    />
  </>
)

const Panel = styled.div`
  background-color: #fff;
  padding: 30px 35px;

  ${Header.H4} {
    margin-bottom: 15px;
  }
`

const TargetsField = ({ name, acessor }: any) => {
  const targetType = useField(acessor);

  return (
    <>
      <Header.H4>Definir alvos</Header.H4>
      {targetType.input.value === 'unique'
        ? (
          <TargetsUniqueFields name={name} />
        ) : (
          <TargetsByGroupFields />
        )}
    </>
  )
}

const SettingsForm = () => (
  <ConnectedForm
    initialValues={{ target_type: 'unique' }}
    onSubmit={(values: any) => {
      console.log('values', { values });
    }}
  >
    {({ submitting }: any) => (
      <>
        <TargetTypeField name='target_type' defaultValue='unique' />
        <Panel>
          <TargetsField name='targets' acessor='target_type' />
        </Panel>
        <Button type='submit' disabled={submitting}>Salvar</Button>
      </>
    )}
  </ConnectedForm>
);

export default SettingsForm;