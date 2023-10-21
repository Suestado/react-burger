import { memo, useState } from 'react';
import FormContainer from '../../FormContainer/FormContainer';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

function ResetPassword() {
  const [passwordValue, setPasswordValue] = useState('');
  const [smsValue, setSmsValue] = useState('');

  return (
    <FormContainer
      header="Восстановление пароля"
      buttonText="Сохранить"
      bottomOptionOne={{
        text: 'Вспомнили пароль?',
        navLink: '/login',
        linkText: 'Войти',
      }}
    >
      <PasswordInput
        placeholder={'Введите новый пароль'}
        onChange={evt => setPasswordValue(evt.target.value)}
        value={passwordValue}
        name={'passwordInput'}
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={evt => setSmsValue(evt.target.value)}
        value={smsValue}
        name={'nameInput'}
      />
    </FormContainer>
  );
}

export default memo(ResetPassword);
