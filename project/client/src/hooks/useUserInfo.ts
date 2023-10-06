import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';
const useUserInfo = () => {
   return useContext(AuthContext);
};
export default useUserInfo;
