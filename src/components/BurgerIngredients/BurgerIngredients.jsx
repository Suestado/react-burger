import { useState, useRef, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import styles from './burgerIngredients.module.css';
import IngredientsSwitchbar from '../IngredientsSwitchbar/IngredientsSwitchbar';
import IngredientsGroupBlock from '../IngredientsGroupBlock/IngredientsGroupBlock';
import Modal from '../Modals/Modal/Modal';
import IngredientDetails from '../Modals/IngredientDetails/IngredientDetails';
import { deleteIngredient, getIngredient } from '../../services/actions/ingredientDetailsActions';

function BurgerIngredients() {
  const [refIngredientHeaders, setRefIngredientHeaders] = useState([]);
  const [activeTab, setActiveTAb] = useState('bun');
  const [detailsOpened, setDetailsOpened] = useState(false);
  const ingredientsRef = useRef(null);
  const dispatch = useDispatch();

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

  const openModal = useCallback((item) => {
    dispatch(getIngredient(item));
    setDetailsOpened(true);
  }, []);

  const closeModal = useCallback((evt) => {
    dispatch(deleteIngredient());
    evt.stopPropagation();
    setDetailsOpened(false);
  }, []);

  return (
    <section className={styles.constructorSection}>
      <h1 className={`text text_type_main-medium ${styles.header}`}>Соберите бургер</h1>
      <IngredientsSwitchbar activeTab={activeTab} setActiveTAb={setActiveTAb}/>
      <div className={styles.ingredientsSection} onScroll={handleScroll} ref={ingredientsRef}>
        <IngredientsGroupBlock title="Булки" type="bun" id="bun" handleHeadersRef={handleHeadersRef} openModal={openModal}/>
        <IngredientsGroupBlock title="Соусы" type="sauce" id="sauce" handleHeadersRef={handleHeadersRef} openModal={openModal}/>
        <IngredientsGroupBlock title="Начинки" type="main" id="main" handleHeadersRef={handleHeadersRef} openModal={openModal}/>
      </div>

      {detailsOpened && <Modal
        title="Детали ингредиента"
        closeModal={closeModal}
      >
        <IngredientDetails/>
      </Modal>
      }
    </section>
  );
}

export default memo(BurgerIngredients);
