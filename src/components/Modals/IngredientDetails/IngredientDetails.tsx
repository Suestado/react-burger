import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSelector } from 'reselect';
import styles from './ingredientDetails.module.css';
import getIngredients from '../../../services/actions/fullIngredientsListActions';
import Preloader from '../../Preloader/Preloader';
import {IngredientInterface} from "../../../utils/commonTypes";

const selectAllIngredients = (store: any) => store.ingredients.fullIngredientList;

const IngredientDetails: FC = (): React.ReactElement => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectIngredient = createSelector(
    [selectAllIngredients],
    (allIngredients: IngredientInterface[]) => {
      return allIngredients.find((item: IngredientInterface) => item._id === id);
    },
  );
  const ingredient = useSelector(selectIngredient);

  useEffect((): void => {
    if (!ingredient) {
      // @ts-ignore
      dispatch(getIngredients());
    }
  }, []);

  return (
    <>
      {!ingredient && <Preloader/>}

      {ingredient && <article className={styles.ingredientWrapper}>
        <img className={styles.picture} src={ingredient.image_large} alt={ingredient.name}/>
        <p className={`text text_type_main-medium ${styles.header}`}>{ingredient.name}</p>
        <ul className={styles.nutrientsList}>
          <li className={styles.nutrientBlock}>
            <p className={`text text_type_main-default ${styles.nutrientName}`}>Калории,ккал</p>
            <p className={`text text_type_digits-default ${styles.nutrientValue}`}>{ingredient.calories}</p>
          </li>

          <li className={styles.nutrientBlock}>
            <p className={`text text_type_main-default ${styles.nutrientName}`}>Белки, г</p>
            <p className={`text text_type_digits-default ${styles.nutrientValue}`}>{ingredient.proteins}</p>
          </li>

          <li className={styles.nutrientBlock}>
            <p className={`text text_type_main-default ${styles.nutrientName}`}>Жиры, г</p>
            <p className={`text text_type_digits-default ${styles.nutrientValue}`}>{ingredient.fat}</p>
          </li>

          <li className={styles.nutrientBlock}>
            <p className={`text text_type_main-default ${styles.nutrientName}`}>Углеводы, г</p>
            <p className={`text text_type_digits-default ${styles.nutrientValue}`}>{ingredient.carbohydrates}</p>
          </li>
        </ul>
      </article>}
    </>
  );
}

export default IngredientDetails;
