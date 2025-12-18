import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = 'user',
    isLoading: roleLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      // console.log("User Role from API:", res.data.role);
      return res.data?.role || 'user';
    },
    
    retry: 1,
    staleTime: 1000 * 60 * 5, 
    
  });
  
  return { role, roleLoading, isError, error };

};

export default useRole;
