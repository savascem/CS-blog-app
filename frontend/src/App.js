import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom'; // Routes ve Route bileşenlerini import et
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import { UserContext } from './contexts/UserContext';
import AlreadyLoggedIn from './components/AlreadyLoggedIn';
import Category from './pages/Category';
import Article from './pages/Article';
import NewPost from './components/NewPost';
import SearchPost from './components/SearchPost';
import './index.css';

const App = () => {

  const { user } = useContext(UserContext);

  const [searchParams, setSearchParams] = useState();
  const [state, setState] = useState(false);

  let date = new Date();

  return (
    <>
      <NavBar setSearch={setSearchParams} search={searchParams} setState={setState} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={!user ? <SignUp /> : <AlreadyLoggedIn />} />
        <Route path='/login' element={!user ? <Login /> : <AlreadyLoggedIn />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/category/:category' element={<Category />} />
        <Route path='/article/:articleid' element={<Article />} />
        <Route path='/create/' element={<NewPost />} />
        <Route path='/search/' element={<SearchPost search={searchParams} setState={setState} state={state} setSearch={setSearchParams} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;