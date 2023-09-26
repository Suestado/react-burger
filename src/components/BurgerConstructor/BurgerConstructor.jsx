import styles from './burgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { baseData } from '../../utils/baseData';

function BurgerConstructor() {
  const fillingsList = baseData.slice(1, baseData.length - 2)
  const isFillingsEmpty = fillingsList.length === 0;

  return (
    <section className={styles.ingredientsSection}>
      <div className={styles.fixIngredientsContainer}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={baseData[0].name}
          price={baseData[0].price}
          thumbnail={baseData[0].image}
        />
      </div>

      <div className={`${styles.ingredientsContainer} ${isFillingsEmpty && styles.ingredientsContainer_type_empty}`}>
        {fillingsList.map((element) => {
          return (
            <div
              key={element._id}
              className={styles.ingredient}>
              <div className={styles.dragIcon}>
                <DragIcon type="primary"/>
              </div>
              <ConstructorElement
                text={element.name}
                price={element.price}
                thumbnail={element.image}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.fixIngredientsContainer}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={baseData[baseData.length - 1].name}
          price={baseData[baseData.length - 1].price}
          thumbnail={baseData[baseData.length - 1].image}
        />
      </div>

      <div className={styles.orderContainer}>
        <div className={styles.priceTag}>
          <p className="text text_type_main-large">
            {baseData.reduce((acc, currentElement) => {
              return currentElement.price + acc;
            }, 0)}
          </p>
            <CurrencyIcon type="primary"/>
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
        >Оформить заказ</Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
