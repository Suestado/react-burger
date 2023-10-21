import { memo } from 'react'
import styles from './appHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <nav className={styles.navBlock}>
          <a className={styles.link} href="#">
            <BurgerIcon type="primary"/>
            <span className={`text text_type_main-default ${styles.linkText}`}>Конструктор</span>
          </a>

          <a className={styles.link} href="#">
            <ListIcon type="secondary"/>
            <span className={`text text_type_main-default ${styles.linkText}`}>Лента заказов</span>
          </a>
        </nav>
        <Logo/>
        <nav className={`${styles.navBlock} ${styles.navBlock__auth}`}>
          <a className={styles.link} href="#">
            <ProfileIcon type="secondary"/>
            <span className={`text text_type_main-default ${styles.linkText}`}>Личный кабинет</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default memo(AppHeader);
