import React, { useEffect, useRef, memo, FC } from 'react';
import styles from './ingredientsGroupBlock.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import {IngredientInterface} from "../../utils/commonTypes";
import { useSelector } from "../../services/hooks/reduxHooks";

interface IIngredientsGroupBlock {
  title: string,
  type: string,
  id: string,
  handleHeadersRef: (groupNameElement: HTMLDivElement) => void;
}

const IngredientsGroupBlock: FC<IIngredientsGroupBlock> = memo(({ title, type, id, handleHeadersRef }): React.ReactElement => {
  const ingredientsList = useSelector((store) => store.ingredients.fullIngredientList);
  const ref = useRef<HTMLDivElement>(null);

  useEffect((): void => {
    handleHeadersRef(ref.current as HTMLHeadingElement);
  }, []);

  const sortedIngredientsList = ingredientsList.filter((item: IngredientInterface) => {
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
