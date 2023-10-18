import { Routes, Route } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Page404 from '../Page404/Page404';

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <>
          <AppHeader/>
          <Main/>
        </>
      }/>

      <Route path='/login' element={
        <>
        </>
      }/>

      <Route path='/register' element={
        <>
        </>
      }/>

      <Route path='/forgot-password' element={
        <>
        </>
      }/>

      <Route path='/reset-password' element={
        <>
        </>
      }/>

      <Route path='/profile' element={
        <>
        </>
      }/>

      <Route path='/ingredients/:id' element={
        <>
        </>
      }/>

      <Route path='*' element={
        <Page404/>
      }/>
    </Routes>
  );
}

export default App;
