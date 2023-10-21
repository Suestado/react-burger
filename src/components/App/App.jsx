import { Routes, Route } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Page404 from '../Page404/Page404';
import Register from '../Pages/Register/Reegister';
import Login from '../Pages/Login/Login';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../Pages/ResetPassword/ResetPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <AppHeader/>
          <Main/>
        </>
      }/>

      <Route path="/login" element={
        <>
          <AppHeader/>
          <Login/>
        </>
      }/>

      <Route path="/register" element={
        <>
          <AppHeader/>
          <Register/>
        </>
      }/>

      <Route path="/forgot-password" element={
        <>
          <AppHeader/>
          <ForgotPassword/>
        </>
      }/>

      <Route path="/reset-password" element={
        <>
          <AppHeader/>
          <ResetPassword/>
        </>
      }/>

      <Route path="/profile" element={
        <>
        </>
      }/>

      <Route path="/ingredients/:id" element={
        <>
        </>
      }/>

      <Route path="*" element={
        <Page404/>
      }/>
    </Routes>
  );
}

export default App;
