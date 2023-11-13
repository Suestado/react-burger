import { useSelector } from 'react-redux';
import { useEffect, useRef, memo, FC } from 'react';
import styles from './ingredientsGroupBlock.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import {IngredientInterface} from "../../utils/commonTypes";

interface IIngredientsGroupBlock {
  title: string,
  type: string,
  id: string,
  handleHeadersRef: (groupNameElement: HTMLDivElement) => void;
}

const IngredientsGroupBlock: FC<IIngredientsGroupBlock> = memo(({ title, type, id, handleHeadersRef }) => {
  const ingredientsList = useSelector((store: any) => store.ingredients.fullIngredientList);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleHeadersRef(ref.current); //TODO откуда мне здесь взять HTML элемент, если он позже по коду только назначится? Или как эту ошибку убрать, чтобы на null не ругался?
  }, []);

  const sortedIngredientsList = ingredientsList.filter((item) => {
    return item.type === type;
  });

  return (
    <section className={styles.ingredientsGroupBlock}>
      <h2 className={styles.header} id={id} ref={ref}>{title}</h2>
      <div className={styles.container}>
        {sortedIngredientsList.map((item: IngredientInterface) => {
          return (
            <BurgerIngredient
              key={item._id}
              item={item}
            />
          );
        })}
      </div>
    </section>
  );
});

export default IngredientsGroupBlock;
