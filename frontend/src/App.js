import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Instruction from './Components/Mock/Instruction';
import PrivateRoute from './Components/Auth/PrivateRoute';
// import Dashboard from './Pages/Dashboard';
// import Mocks from './Pages/Mocks';
// import MyProfile from './Components/Dashboard/MyProfile';
import { getAuth } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setToken } from './slices/authSlice';
import Analysis from './Components/Analysis/index';
// import AnalysisPage from './Pages/Analysis';
import Practice from './Pages/Exercise';
import ExercisePage from './Components/Exercise/ExercisePage';
// import Exercise from './Pages/Exercise';
import PageNotFound from './Pages/PageNotFound';
import refreshTokenIfExpired from './utils/refreshTokenIfExpired ';
import { handleGoogleRedirect } from './utils/googleAuth';
import { useAuthState } from "react-firebase-hooks/auth";
import { setupInterceptor } from './utils/interceptor';
import { initFirebase } from './utils/firebase';
import Loader from './Components/Loader';
import { pdfjs } from 'react-pdf';
import CoursePlan from './Components/Auth/CoursePlan';

const Dashboard= React.lazy(()=>import( './Pages/Dashboard'));
const Exercise= React.lazy(()=>import('./Pages/Exercise'));
const AnalysisPage= React.lazy(()=>import('./Pages/Analysis'));
const Mocks = React.lazy(()=>import('./Pages/Mocks'));
const MyProfile = React.lazy(()=>import('./Components/Dashboard/MyProfile'))
const DashboardPage= React.lazy(()=>import('./Components/Dashboard/Dashboard'))
const CoursesPage= React.lazy(()=>import('./Pages/Courses'))
const Course= React.lazy(()=>import('./Components/Courses/Course'))
const CourseViewer= React.lazy(()=>import('./Components/Courses/CourseViewer'))
const Resource= React.lazy(()=>import('./Components/Courses/Resource'))



pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();


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

  useEffect(()=>{
    
    refreshTokenIfExpired(dispatch)
    
  },[])

  // useEffect(() => {
  //   console.log("app auth")
  //   const auth = getAuth();
  //   auth.onIdTokenChanged((userCred) => {
  //     console.log("hook", userCred)
  //     if (userCred) {
  //       userCred.getIdToken().then((token) => {
  //         window.localStorage.setItem("token", token);
  //         dispatch(setToken(token));
  //       });
  //     }
  //   });
  // }, []);
  // initFirebase();
  const auth = getAuth();
  const [load,setLoad] = useState(false)
  const [user, loading] = useAuthState(getAuth());
  setupInterceptor(user);
  useEffect(() => {
    const fetchData = async () => {
      setLoad(true);
      await handleGoogleRedirect(auth, setLoad);
    };
   
    fetchData();
  }, []);
  
  const isCourseAccessible = (courseId) => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const plans = storedUserData?.plans || [];

    return plans.some(plan => 
      plan.plan.test.includes(courseId)
    );
  };
  
  return (
    <div className='w-screen h-full mx-auto relative flex flex-col'>
      {shouldShowNavbar() && <Navbar handleClick={handleClick} setSignOut={setSignOut} />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route   path='/login' element={<Login signOut={signOut} />} />
        <Route
          element={
            <Suspense fallback={<Loader/>}>
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
            </Suspense>
        
          }>
          {/* <Route exact path="/courses" element={<Suspense fallback={<Loader/>}><DashboardPage /></Suspense>} /> */}
          <Route  path="/courses" element={<Suspense fallback={<Loader/>}><CoursesPage /></Suspense>} />
          <Route path="/courses/course/:id" element={<CoursePlan />}>
            <Route index element={<Course />} />
            <Route path="course-viewer" element={<CourseViewer />} />
            <Route path="course-viewer/lecture/:resourceId" element={<Resource />} />
          </Route>
          {/* <Route exact path="/Courses/course/:id" element={<Suspense fallback={<Loader/>}><Course /></Suspense>} />
          <Route exact path="/courses/course/course-viewer/:id" element={<Suspense fallback={<Loader/>}><CourseViewer /></Suspense>} />
          <Route exact path="/courses/course/course-viewer/:id/lecture/:resourceid" element={<Suspense fallback={<Loader/>}><Resource /></Suspense>} /> */}
          <Route exact path="/mocks" element={ <Suspense fallback={<Loader/>}><Mocks /></Suspense>} />
          <Route exact path='/mocks/mock/:id' element={<Instruction />} />
          <Route exact path='/analysis' element={ <Suspense fallback={<Loader/>}><AnalysisPage /></Suspense>} />
          <Route exact path='/analysis/:id' element={<Analysis />} />
          <Route exact path='/exercise' element={ <Suspense fallback={<Loader/>}><Exercise /></Suspense>} />
          <Route exact path='/exercise/:id' element={<ExercisePage />} />
    
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </div>
  );
};

export default App;
