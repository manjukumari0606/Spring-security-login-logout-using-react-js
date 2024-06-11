import './App.css'
import ListOfEmployee from './component/ListOfEmployee'
import Header from './component/Header'
import Footer from './component/Footer'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AddEmployee from './component/AddEmployee'
import Login from './login/Login'
import Registration from './login/Registration'
import Home from './login/Home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path='/employee' element={<ListOfEmployee />} />
          <Route path='/add-employee' element={<AddEmployee />} />
          <Route path='/edit-employee/:id' element={<AddEmployee />} />
        </Routes>
      </BrowserRouter>
    </>
  );

  
}

export default App;
