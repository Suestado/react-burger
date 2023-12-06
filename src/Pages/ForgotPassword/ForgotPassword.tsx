import React, { memo, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/FormContainer/FormContainer';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../../utils/MainApi';
import { useForm } from "../../utils/hooks/useForm";

const ForgotPassword: FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const {values, handleChange} = useForm();

  const onSubmit = (): void => {
    forgotPassword(values.emailInput)
      .then(() => {
        const fpState = {forgotPassword: true};
        navigate('/reset-password', {state: fpState});
      })
      .catch((err) => {
        console.log(`При попытке восстановления пароля произошла ошибка - ${err}`);
      });
  };

  return (
    <FormContainer
      header="Восстановление пароля"
      buttonText="Восстановить"
      bottomOptionOne={{
        text: 'Вспомнили пароль?',
        navLink: '/login',
        linkText: 'Войти',
      }}
      onSubmit={onSubmit}
      errorTitle="При попытке восстановления пароля произошла ошибка"
    >
      <EmailInput
        onChange={handleChange}
        value={values.emailInput || ''}
        name={'emailInput'}
        placeholder="Укажите e-mail"
      />
    </FormContainer>
  );
}

export default memo(ForgotPassword);
