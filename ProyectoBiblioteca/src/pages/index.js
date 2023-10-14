import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    //Redireccion a login
    const redirectTimeout = setTimeout(() => {
      router.push('/login');
    }, 1); 
    return () => clearTimeout(redirectTimeout);
  }, []); 

  return (
    <div>
      {}
    </div>
  );
};

export default Home;