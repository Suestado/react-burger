import { memo, useState } from 'react';
import FormContainer from '../../FormContainer/FormContainer';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

function Register() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <FormContainer
      header="Регистрация"
      buttonText="Зарегистрироваться"
      bottomOptionOne={{
        text: 'Уже зарегистрированы?',
        navLink: '/login',
        linkText: 'Войти',
      }}
    >
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={evt => setNameValue(evt.target.value)}
        value={nameValue}
        name={'nameInput'}
      />
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
  );
}

export default memo(Register);
