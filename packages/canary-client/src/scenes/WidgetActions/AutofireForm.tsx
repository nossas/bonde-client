import React from "react";
import {
  ConnectedForm,
  InputField,
  TextareaField,
  Button,
  Card,
  Header,
  toast,
  Validators,
  Text,
} from "bonde-components";
import { useMutation, gql } from "bonde-core-tools";
import { useTranslation } from "react-i18next";
import { css } from "styled-components/macro";
import { Widget } from "./FetchWidgets";
import { noSpecialCharacters } from "../../services/utils";

type Props = {
  widget: Widget;
};

const SAVE_AUTOFIRE_SETTINGS = gql`
  mutation SaveAutofireSettings(
    $widgetId: Int_comparison_exp!
    $autofireSettings: jsonb!
  ) {
    update_widgets(
      _append: { settings: $autofireSettings }
      where: { id: $widgetId }
    ) {
      affected_rows
    }
  }
`;

type FormData = {
  sender_name: string;
  sender_email: string;
  email_subject: string;
  email_body: string;
};

const AutofireForm = ({ widget }: Props): React.ReactElement => {
  const { t } = useTranslation("widget");
  const [saveAutofireSettings] = useMutation(SAVE_AUTOFIRE_SETTINGS);
  const onSubmit = async (widgetId: number, formData: FormData) => {
    try {
      const autofireSettings = await saveAutofireSettings({
        variables: {
          widgetId: { _eq: widgetId },
          autofireSettings: formData,
        },
      });
      if (!(autofireSettings.data.update_widgets.affected_rows === 1)) {
        throw new Error("Houve um erro ao salvar o formulário");
      }
      toast("Sucesso ao salvar as configurações!", {
        type: toast.TYPE.SUCCESS,
      });
    } catch (e) {
      console.log(e);
      return toast("Houve um erro ao salvar o formulário", {
        type: toast.TYPE.ERROR,
      });
    }
  };
  const { required, composeValidators, isEmail } = Validators;
  return (
    <ConnectedForm
      onSubmit={(e) => onSubmit(widget.id, e)}
      initialValues={{ ...widget.settings }}
    >
      {({ submitting }) => (
        <>
          <div
            css={css`
              position: absolute;
              top: -170px;
              right: 0;
              width: 150px;
            `}
          >
            <Button type="submit" disabled={submitting}>
              Salvar
            </Button>
          </div>
          <Header.H4
            style={{
              margin: "10px 0",
            }}
          >
            {t("settings.autofire.title")}
          </Header.H4>
          <Text style={{ marginBottom: "15px" }}>
            {t("settings.autofire.subtitle")}
          </Text>
          <Card padding={{ x: 40, y: 30 }}>
            <InputField
              label={t("settings.autofire.label.sendersName")}
              name="sender_name"
              placeholder={t("settings.autofire.placeholder.sendersName")}
              validate={composeValidators(
                required(t("settings.autofire.validators.required")),
                noSpecialCharacters(
                  t("settings.autofire.validators.noSpecialCharacter")
                )
              )}
            />
            <InputField
              label={t("settings.autofire.label.sendersEmail")}
              name="sender_email"
              placeholder={t("settings.autofire.placeholder.sendersEmail")}
              validate={composeValidators(
                required(t("settings.autofire.validators.required")),
                isEmail(t("settings.autofire.validators.isEmail"))
              )}
            />
            <InputField
              label={t("settings.autofire.label.emailSubject")}
              name="email_subject"
              placeholder={t("settings.autofire.placeholder.emailSubject")}
              validate={composeValidators(
                required(t("settings.autofire.validators.required"))
              )}
            />
            <TextareaField
              label={t("settings.autofire.label.emailBody")}
              name="email_text"
              placeholder={t("settings.autofire.placeholder.emailBody")}
              validate={composeValidators(
                required(t("settings.autofire.validators.required"))
              )}
            />
          </Card>
        </>
      )}
    </ConnectedForm>
  );
};

export default AutofireForm;
