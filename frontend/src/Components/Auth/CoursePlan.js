import { Outlet, useParams, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CoursePlan = () => {
    const {id}= useParams();

    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isCourseAccessible(id)) {
        navigate('/courses');  // Redirect if course is not accessible
      }
    }, [id, navigate]);
  
    const isCourseAccessible = (id) => {
      const plans = storedUserData?.plans || [];
      // console.log(plans);
      return plans.some(plan => plan?.plan?._id.includes(id));
    };
  
  return isCourseAccessible(id) ? <Outlet /> : <Navigate to="/courses" />;
};

export default CoursePlan;
