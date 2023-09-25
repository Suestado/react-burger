import { useState, useEffect } from 'react';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import MainApi from '../../utils/MainApi';
import { GlobalContext } from '../../context/GlobalContext';


function Main() {
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    MainApi.getIngredients()
      .then((res) => setIngredientsList(res.data))
      .catch((err) => console.log(err));
  }, []);


  return (
    <GlobalContext.Provider value={{ ingredientsList }}>
      <main className="main">
        <BurgerIngredients/>
        <BurgerConstructor/>
      </main>
    </GlobalContext.Provider>
  );
}

export default Main;
