import { useState, useRef, useCallback, memo } from 'react';
import styles from './burgerIngredients.module.css';
import IngredientsSwitchbar from '../IngredientsSwitchbar/IngredientsSwitchbar';
import IngredientsGroupBlock from '../IngredientsGroupBlock/IngredientsGroupBlock';

function BurgerIngredients() {
  const [refIngredientHeaders, setRefIngredientHeaders] = useState([]);
  const [activeTab, setActiveTAb] = useState('bun');
  const ingredientsRef = useRef(null);

  const handleHeadersRef = useCallback((ref) => {
    setRefIngredientHeaders((prevState) => ([
      ...prevState,
      ref.current,
    ]));
  }, []);

  function handleScroll() {
    const blockTop = ingredientsRef.current.getBoundingClientRect().top;
    let minDistance = Math.abs(refIngredientHeaders[0].getBoundingClientRect().top - blockTop);

    refIngredientHeaders.forEach((item) => {
      let newDistance = Math.abs(item.getBoundingClientRect().top - blockTop);

      if (newDistance <= minDistance) {
        minDistance = newDistance;
        setActiveTAb(item.id);
      }
    });
  }

  return (
    <section className={styles.constructorSection}>
      <h1 className={`text text_type_main-medium ${styles.header}`}>Соберите бургер</h1>
      <IngredientsSwitchbar activeTab={activeTab} setActiveTAb={setActiveTAb}/>
      <div className={styles.ingredientsSection} onScroll={handleScroll} ref={ingredientsRef}>
        <IngredientsGroupBlock title="Булки" type="bun" id="bun" handleHeadersRef={handleHeadersRef}/>
        <IngredientsGroupBlock title="Соусы" type="sauce" id="sauce" handleHeadersRef={handleHeadersRef}/>
        <IngredientsGroupBlock title="Начинки" type="main" id="main" handleHeadersRef={handleHeadersRef}/>
      </div>
    </section>
  );
}

export default memo(BurgerIngredients);
