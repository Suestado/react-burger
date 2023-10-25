import { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../../FormContainer/FormContainer';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from '../../../services/actions/userActions';

function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.currentUser);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = () => {
    dispatch(loginUser(emailValue, passwordValue));
  };

  useEffect(() => {
    if (currentUser.email) {
      const lastLocation = location.state?.lastPage || '/';
      navigate(lastLocation, { replace: true });
    }
  }, [currentUser]);

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
        text: 'Забыли пароль?',
        navLink: '/forgot-password',
        linkText: 'Восстановить пароль',
      }}
      onSubmit={onSubmit}
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
  );
}

export default memo(Login);
