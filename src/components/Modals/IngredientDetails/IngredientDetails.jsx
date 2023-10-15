import { useSelector } from 'react-redux';
import styles from './ingredientDetails.module.css';

function IngredientDetails() {
  const {
    name,
    image_large,
    calories,
    proteins,
    fat,
    carbohydrates,
  } = useSelector((state) => state.modalIngredient);

  return (
    <article className={styles.ingredientWrapper}>
      <img className={styles.picture} src={image_large} alt={name}/>
      <p className={`text text_type_main-medium ${styles.header}`}>{name}</p>
      <ul className={styles.nutrientsList}>
        <li className={styles.nutrientBlock}>
          <p className={`text text_type_main-default ${styles.nutrientName}`}>Калории,ккал</p>
          <p className={`text text_type_digits-default ${styles.nutrientValue}`}>{calories}</p>
        </li>

        <li className={styles.nutrientBlock}>
          <p className={`text text_type_main-default ${styles.nutrientName}`}>Белки, г</p>
          <p className={`text text_type_digits-default ${styles.nutrientValue}`}>{proteins}</p>
        </li>

        <li className={styles.nutrientBlock}>
          <p className={`text text_type_main-default ${styles.nutrientName}`}>Жиры, г</p>
          <p className={`text text_type_digits-default ${styles.nutrientValue}`}>{fat}</p>
        </li>

        <li className={styles.nutrientBlock}>
          <p className={`text text_type_main-default ${styles.nutrientName}`}>Углеводы, г</p>
          <p className={`text text_type_digits-default ${styles.nutrientValue}`}>{carbohydrates}</p>
        </li>
      </ul>
    </article>
  );
}

export default IngredientDetails;
