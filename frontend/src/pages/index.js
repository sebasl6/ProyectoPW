import { useEffect } from 'react';
import { useRouter } from 'next/router';
import './index.module.css';
import style from './index.module.css';
import Usuario from '../datos/usuario.json';
import Admin from '../datos/administradores.json';


const Home = () => {




const Logear = () => {
  const [state, setState] = useState(
    { 
      usuario: "", 
      contrasena: ""
    });
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
}

export default Home;
