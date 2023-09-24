import { useState, useEffect } from 'react';
import ConstructorBlock from '../ConstructorBlock/ConstructorBlock';
import IngredientsBlock from '../IngredientsBlock/IngredientsBlock';
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
        <ConstructorBlock/>
        <IngredientsBlock/>
      </main>
    </GlobalContext.Provider>
  );
}

export default Main;
