import { memo, useState } from 'react';
import FormContainer from '../../FormContainer/FormContainer';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <FormContainer
      header="Вход"
      buttonText="Войти"
      bottomOptionOne={{
        text: 'Вы - новый пользователь?',
        navLink: '/register',
        linkText: 'Зарегистрироваться',
      }}
      bottomOptionTwo={{
        text: 'Забфли пароль?',
        navLink: '/forgot-password',
        linkText: 'Восстановить пароль',
      }}
    >
      <EmailInput
        onChange={evt => setEmailValue(evt.target.value)}
        value={emailValue}
        name={'emailInput'}
        placeholder="E-mail"
      />
      <PasswordInput
        onChange={evt => setPasswordValue(evt.target.value)}
        value={passwordValue}
        name={'passwordInput'}
      />
    </FormContainer>
  )
}

export default memo(Login)
