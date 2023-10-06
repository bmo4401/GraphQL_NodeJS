import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoot = () => {
   const navigate = useNavigate();
   if (!localStorage.getItem('accessToken')) {
      navigate('/login');
      return;
   }
   return <Outlet />;
};
export default ProtectedRoot;
