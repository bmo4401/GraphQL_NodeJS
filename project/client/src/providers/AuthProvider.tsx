import { User, getAuth } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<{
   user: User | null;
   setUser: ((user: User) => void) | null;
}>({ user: null, setUser: null });
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);
   const auth = getAuth();
   const navigate = useNavigate();
   useEffect(() => {
      const unsubscribed = auth.onIdTokenChanged(async (user) => {
         if (user?.uid) {
            setUser(user);
            localStorage.setItem('accessToken', await user.accessToken);
         }
      });
      setUser(null);
      localStorage.clear();
      navigate('/login');
      return () => {
         unsubscribed();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [auth]);
   return (
      <AuthContext.Provider value={{ user, setUser }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
