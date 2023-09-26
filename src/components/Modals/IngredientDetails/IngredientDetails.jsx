import styles from './ingredientDetails.module.css';

function IngredientDetails({ ingredients }) {
  return (
    <article className={styles.ingredientWrapper}>
      <img className={styles.picture} src={ingredients.image} alt={ingredients.name}/>
      <p className={`text text_type_main-medium ${styles.header}`}>{ingredients.name}</p>
      <ul className={styles.nutrientsList}>
        <li className={styles.nutrientBlock}>
          <p className={`text text_type_main-default ${ styles.nutrientName }`}>Калории,ккал</p>
          <p className={`text text_type_digits-default ${ styles.nutrientValue }`}>{ingredients.calories}</p>
        </li>

        <li className={styles.nutrientBlock}>
          <p className={`text text_type_main-default ${ styles.nutrientName }`}>Белки, г</p>
          <p className={`text text_type_digits-default ${ styles.nutrientValue }`}>{ingredients.proteins}</p>
        </li>

        <li className={styles.nutrientBlock}>
          <p className={`text text_type_main-default ${ styles.nutrientName }`}>Жиры, г</p>
          <p className={`text text_type_digits-default ${ styles.nutrientValue }`}>{ingredients.fat}</p>
        </li>

        <li className={styles.nutrientBlock}>
          <p className={`text text_type_main-default ${ styles.nutrientName }`}>Углеводы, г</p>
          <p className={`text text_type_digits-default ${ styles.nutrientValue }`}>{ingredients.carbohydrates}</p>
        </li>
      </ul>
    </article>
  );
}

export default IngredientDetails;
