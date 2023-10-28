import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ingredientDetails.module.css';
import getIngredients from '../../../services/actions/fullIngredientsListActions';
import Preloader from '../../Preloader/Preloader';

function IngredientDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredient = useSelector((state) => state.ingredients.fullIngredientList).find((item) => item._id === id);
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  useEffect(() => {
    if(!ingredient) {
      dispatch(getIngredients());
    }
  }, []);

  useEffect(() => {
    if (ingredient) {
      setIsOpenDetails(true);
    }
    console.log(ingredient);
  }, [ingredient]);

  return (
    <>
      {!isOpenDetails && <Preloader/>}

      {isOpenDetails && <article className={styles.ingredientWrapper}>
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
