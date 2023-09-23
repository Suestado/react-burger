import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function Header() {
  return (
    <header className="header">
      <div className="headerContent">
        <nav className="navBlock">
          <a className="link" href="#">
            <BurgerIcon type="primary"/>
            <span className="linkText">Конструктор</span>
          </a>

          <a className="link" href="#">
            <ListIcon type="secondary"/>
            <span className="linkText">Лента заказов</span>
          </a>
        </nav>
        <Logo/>
        <nav className="navBlock navBlock__auth">
          <a className="link" href="#">
            <ProfileIcon type="secondary"/>
            <span className="linkText">Личный кабинет</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
