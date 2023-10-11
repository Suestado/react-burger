import styles from './ingredientsSwitchbar.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { INGREDIENTS_SWITCHBAR } from '../../utils/types';

function IngredientsSwitchbar({ activeTab }) {

  return (
    <div className={styles.ingredientsSwitchbar}>
      <a className={styles.link} href="#bun">
        <Tab value="one" active={activeTab === 'bun'}>
          Булки
        </Tab>
      </a>
      <a className={styles.link} href="#sauce">
        <Tab value="two" active={activeTab === 'sauce'}>
          Соусы
        </Tab>
      </a>
      <a className={styles.link} href="#main">
        <Tab value="three" active={activeTab === 'main'}>
          Начинки
        </Tab>
      </a>
    </div>
  );
}

IngredientsSwitchbar.propTypes = INGREDIENTS_SWITCHBAR;

export default IngredientsSwitchbar;
