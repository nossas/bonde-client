import React from "react";
import {
  Button,
  ConnectedForm,
  Header,
  InputField,
  Link as LinkStyled,
  Text,
  Validators,
} from "bonde-components";
import { Container, Row, Col } from "react-grid-system";
import { useMutation, gql } from "bonde-core-tools";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const { composeValidators, required, min } = Validators;

const resetPasswordMutation = gql`
  mutation ResetPassword($password: String!, $token: String!) {
    reset_password_change(password: $password, token: $token) {
      first_name
      token
    }
  }
`;

const ResetPasswordForm = ({ token }: any) => {
  const { t } = useTranslation("auth");
  const [resetPassword] = useMutation(resetPasswordMutation);
  const history = useHistory();

  const submit = async (values: any) => {
    try {
      await resetPassword({ variables: values });
      history.push("/login");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Container fluid style={{ width: "100%", padding: "0" }}>
      <Header.H2>{t("resetPassword.form.title")}</Header.H2>
      <Text>{t("resetPassword.form.subtitle")}</Text>
      <ConnectedForm initialValues={{ token }} onSubmit={submit}>
        {({ submitting }: any) => (
          <>
            <InputField
              name="password"
              type="password"
              label={t("resetPassword.fields.password.label")}
              hint={t("resetPassword.fields.password.hint")}
              validate={composeValidators(
                required(t("resetPassword.fields.password.required")),
                min(6, t("resetPassword.fields.password.min6"))
              )}
            />
            <Row align="center">
              <Col sm={6}>
                <LinkStyled component={Link} to="/login">
                  {t("resetPassword.form.cancel")}
                </LinkStyled>
              </Col>
              <Col sm={6}>
                <Button type="submit" disabled={submitting}>
                  {t("resetPassword.form.submit")}
                </Button>
              </Col>
            </Row>
          </>
        )}
      </ConnectedForm>
    </Container>
  );
};

export default ResetPasswordForm;
