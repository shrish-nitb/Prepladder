import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Instruction from './Components/Mock/Instruction';
import PrivateRoute from './Components/Auth/PrivateRoute';
import Dashboard from './Pages/Dashboard';
import Mocks from './Pages/Mocks';
import MyProfile from './Components/Dashboard/MyProfile';
import { getAuth } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setToken } from './slices/authSlice';
import Analysis from './Components/Analysis/index';
import AnalysisPage from './Pages/Analysis';
import Practice from './Pages/Exercise';
import ExercisePage from './Components/Exercise/ExercisePage';
import Exercise from './Pages/Exercise';
import PageNotFound from './Pages/PageNotFound';

const App = () => {
  const ref = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const [signOut, setSignOut] = useState(true);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const shouldShowNavbar = () => {
    const hiddenRoutes = ['/mocks/mock', '/login'];
    return !hiddenRoutes.some(route => location.pathname.startsWith(route));
  };

  useEffect(() => {
    const auth = getAuth();
    auth.onIdTokenChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          window.localStorage.setItem("token", token);
          dispatch(setToken(token));
        });
      }
    });
  }, [dispatch]);

  

  return (
    <div className='w-screen h-full mx-auto relative flex flex-col'>
      {shouldShowNavbar() && <Navbar handleClick={handleClick} setSignOut={setSignOut} />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route exact path='/login' element={<Login signOut={signOut} />} />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
          <Route exact path="/dashboard/my-profile" element={<MyProfile />} />
          <Route exact path="/mocks" element={<Mocks />} />
          <Route exact path='/mocks/mock/:id' element={<Instruction />} />
          <Route exact path='/analysis' element={<AnalysisPage />} />
          <Route exact path='/analysis/:id' element={<Analysis />} />
          <Route exact path='/exercise' element={<Exercise />} />
          <Route exact path='/exercise/:id' element={<ExercisePage />} />
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </div>
  );
};

export default App;
