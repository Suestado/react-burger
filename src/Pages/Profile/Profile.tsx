import React, { FC } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import styles from './profile.module.css';
import { logOut } from '../../utils/MainApi';
import { logOutUser } from '../../services/actions/userActions';
import { useDispatch } from "../../services/hooks/reduxHooks";

const Profile: FC = (): React.ReactElement => {
  const currentLocation: string = useLocation().pathname;
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    logOut(localStorage.getItem('refreshToken'))
      .then((res) => {
        if (res.success) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(logOutUser());
        }
      })
      .catch((err) => {
        console.log(`При попытке выхода из аккаунта произошла ошибка - ${err}`);
      });
  };

  return (
    <section className={styles.profile}>
      <div className={styles.navContainer}>
        <nav className={styles.navBar}>
          <ul className={`${styles.navList} text text_type_main-medium`}>
            <li className={`${styles.navItem} ${currentLocation !== '/profile' && 'text_color_inactive'}`}>
              <Link to="/profile" className={styles.navLink}>Профиль</Link>
            </li>
            <li className={`${styles.navItem} ${currentLocation !== '/profile/orders' && 'text_color_inactive'}`}>
              <Link to="/profile/orders" className={styles.navLink}>История заказов</Link>
            </li>
            <li className={`${styles.navItem} ${currentLocation !== '/exit' && 'text_color_inactive'}`}
                onClick={handleLogout}
            >Выход
            </li>
          </ul>
        </nav>
        <p className={`${styles.navDescription} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <Outlet/>
    </section>
  );
}

export default Profile;
