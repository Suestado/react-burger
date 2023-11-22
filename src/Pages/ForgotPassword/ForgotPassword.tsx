import React, {memo, useState, FC, ChangeEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import FormContainer from '../../components/FormContainer/FormContainer';
import {EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {forgotPassword} from '../../utils/MainApi';

const ForgotPassword: FC = (): React.ReactElement => {
  const [emailValue, setEmailValue] = useState<string>('');
  const navigate = useNavigate();

  const onSubmit = (): void => {
    forgotPassword(emailValue)
      .then((res) => {
        if (res.success) {
          const fpState = {forgotPassword: true};
          navigate('/reset-password', {state: fpState});
        }
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
        onChange={(evt: ChangeEvent<HTMLInputElement>) => setEmailValue(evt.target.value)}
        value={emailValue}
        name={'emailInput'}
        placeholder="Укажите e-mail"
      />
    </FormContainer>
  );
}

export default memo(ForgotPassword);
