import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/FormContainer/FormContainer';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import MainApi from '../../utils/MainApi';

function ForgotPassword() {
  const [emailValue, setEmailValue] = useState('');
  const navigate = useNavigate();

  const onSubmit = () => {
    MainApi.forgotPassword(emailValue)
      .then((res) => {
        if (res.success) {
          const fpState = { forgotPassword: true };
          navigate('/reset-password', { state: fpState });
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
        onChange={evt => setEmailValue(evt.target.value)}
        value={emailValue}
        name={'emailInput'}
        placeholder="Укажите e-mail"
      />
    </FormContainer>
  );
}

export default memo(ForgotPassword);
