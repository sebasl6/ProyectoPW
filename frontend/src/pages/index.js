import { useEffect } from 'react';
import { useRouter } from 'next/router';

<<<<<<< Updated upstream
const Home = () => {
=======

import './index.module.css';
import style from './index.module.css'
import Usuario from '../datos/usuarios.json';
import Admin from '../datos/admins.json';

const Logear = () => {
  const [state, setState] = useState(
    { 
      usuario: "", 
      contrasena: ""
    });
>>>>>>> Stashed changes
  const router = useRouter();

  useEffect(() => {
    //Redireccion a login
    const redirectTimeout = setTimeout(() => {
      router.push('/login');
    }, 1); 
    return () => clearTimeout(redirectTimeout);
  }, []); 

  return (
<<<<<<< Updated upstream
    <div>
      {}
    </div>
  );
};

export default Home;
=======
    <>
    <div className={style.login}>
      <div className={style.title}>Sistema de reserva de libros</div>
      <div className={style.container}>
        <div className={style.formcontainer}>
          <form onSubmit={validarLogeo}> {/* Agregamos onSubmit para manejar el envío del formulario */}
            <div className={style.inputcontainer}>
              <label className={style.formlabel} htmlFor="usuario">Usuario o correo:</label>
              <input className={style.forminput} type="text" id="usuario" name="usuario" onChange={mngmtChange} value={state.usuario} required/>
            </div>
            <div className={style.inputcontainer}>
              <label className={style.formlabel} htmlFor="contrasena">Contraseña:</label>
              <input className={style.forminput} type="password" id="contrasena" name="contrasena" onChange={mngmtChange} value={state.contrasena} required/>
            </div>
            <div className={style.forgotpasswordcontainer}>
              <span className={style.forgotpassword}>Olvidé mi contraseña</span>
            </div>

            <div className={style.buttoncontainer}>
              <Link href="./register"><button className={style.loginbutton}>Registrar usuario</button></Link>
              <button className={style.registerbutton} type="submit">Ingresar</button> {/* Cambiamos el botón a type="submit" para que active onSubmit */}
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  )
}

export default Logear;
>>>>>>> Stashed changes
