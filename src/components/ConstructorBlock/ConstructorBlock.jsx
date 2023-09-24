import styles from './constructorBlock.module.css';
import IngredientsSwitchbar from '../IngredientsSwitchbar/IngredientsSwitchbar';
import IngredientsGroupBlock from '../IngredientsGroupBlock/IngredientsGroupBlock';


function ConstructorBlock() {
  return(
    <section className={styles.constructorSection}>
      <h1 className={styles.header}>Соберите бургер</h1>
      <IngredientsSwitchbar/>
      <div className={styles.ingredientsSection}>
        <IngredientsGroupBlock title="Булки" type="bun" id="bun"/>
        <IngredientsGroupBlock title="Соусы" type="sauce" id="sauce"/>
        <IngredientsGroupBlock title="Начинки" type="main" id="main"/>
      </div>
    </section>
  )
}

export default ConstructorBlock;
