import React, { useState, useRef, useCallback, memo } from 'react';
import styles from './burgerIngredients.module.css';
import IngredientsSwitchbar from '../IngredientsSwitchbar/IngredientsSwitchbar';
import IngredientsGroupBlock from '../IngredientsGroupBlock/IngredientsGroupBlock';

function BurgerIngredients(): React.ReactElement {
  const [refIngredientHeaders, setRefIngredientHeaders] = useState<HTMLDivElement[]>([]);
  const [activeTab, setActiveTAb] = useState<string>('bun');
  const ingredientsRef = useRef<HTMLDivElement | null>(null);

  type ThandleHeadersRef = (groupNameElement: HTMLDivElement) => void;
  const handleHeadersRef = useCallback<ThandleHeadersRef>((groupNameElement) => {
    setRefIngredientHeaders((prevState) => ([
      ...prevState,
      groupNameElement,
    ]));
  }, []);

  const handleScroll = (): void => {
    if (!ingredientsRef.current) return;
    const blockTop: number = ingredientsRef.current.getBoundingClientRect().top;
    let minDistance: number = Math.abs(refIngredientHeaders[0].getBoundingClientRect().top - blockTop);

    refIngredientHeaders.forEach((item) => {
      let newDistance: number = Math.abs(item.getBoundingClientRect().top - blockTop);

      if (newDistance <= minDistance) {
        minDistance = newDistance;
        setActiveTAb(item.id);
      }
    });
  }

  return (
    <section className={styles.constructorSection}>
      <h1 className={`text text_type_main-medium ${styles.header}`}>Соберите бургер</h1>
      <IngredientsSwitchbar activeTab={activeTab}/>
      <div className={styles.ingredientsSection} onScroll={handleScroll} ref={ingredientsRef}>
        <IngredientsGroupBlock title="Булки" type="bun" id="bun" handleHeadersRef={handleHeadersRef}/>
        <IngredientsGroupBlock title="Соусы" type="sauce" id="sauce" handleHeadersRef={handleHeadersRef}/>
        <IngredientsGroupBlock title="Начинки" type="main" id="main" handleHeadersRef={handleHeadersRef}/>
      </div>
    </section>
  );
}

export default memo(BurgerIngredients);
