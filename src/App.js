import logo from './logo.svg';
import './App.css';
import { useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProvidePage from './Pages/ProvidePage';
import SavingPage from './Pages/SavingPage';
import SignIn from './Pages/SignIn';
import GetNewPw from './Pages/GetNewPw';
export const Container = createContext()
function App() {
  let [id, setId] = useState(null)
  return (
    <Container.Provider value={{ id, setId }}>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={id ? <ProvidePage /> : <SignIn />}></Route>
          <Route path='/saving-page' element={id ? <SavingPage /> : <SignIn />}></Route>
          <Route path='/' element={<SignIn />} ></Route>
          <Route path='/change-password' element={<GetNewPw />}></Route>
        </Routes>
      </BrowserRouter>
    </Container.Provider>
  );
}

export default App;
