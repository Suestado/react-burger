import { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../FormContainer/FormContainer';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import MainApi from '../../../utils/MainApi';

function ForgotPassword() {
  const [emailValue, setEmailValue] = useState('');
  const currentUser = useSelector((store) => store.currentUser);
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

  useEffect(() => {
    if (currentUser.email) {
      navigate(-1);
    }
  }, [currentUser]);

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
