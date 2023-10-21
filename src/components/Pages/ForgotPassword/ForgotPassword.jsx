import { memo, useState } from 'react';
import FormContainer from '../../FormContainer/FormContainer';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

function ForgotPassword() {
  const [emailValue, setEmailValue] = useState('');

  return (
    <FormContainer
      header="Восстановление пароля"
      buttonText="Восстановить"
      bottomOptionOne={{
        text: 'Вспомнили пароль?',
        navLink: '/login',
        linkText: 'Войти',
      }}
    >
      <EmailInput
        onChange={evt => setEmailValue(evt.target.value)}
        value={emailValue}
        name={'emailInput'}
        placeholder="Укажите e-mail"
      />
    </FormContainer>
  )
}

export default memo(ForgotPassword);
