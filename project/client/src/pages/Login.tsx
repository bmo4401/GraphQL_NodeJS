import useUserInfo from '@/hooks/useUserInfo';
import { AuthContext } from '@/providers/AuthProvider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
const Login = () => {
   const auth = getAuth();
   const { user } = useContext(AuthContext);

   const handleLogin = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
   };
   if (user?.uid) {
      return (
         <Navigate
            to="/"
            replace={true}
         />
      );
   }
   return (
      <>
         <Typography
            variant="h5"
            sx={{ marginBottom: '10px' }}
         >
            Welcome to Note App
         </Typography>
         <Button
            variant="outlined"
            onClick={handleLogin}
         >
            Login with Google
         </Button>
      </>
   );
};
export default Login;
