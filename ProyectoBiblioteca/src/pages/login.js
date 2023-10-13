import Link from 'next/link'
import { useState } from "react"
import { useRouter } from 'next/router';

import Admins from '/src/datos/administradores.json'
import Usuario from '/src/datos/usuario.json'

const Logear = () => {
  const [state, setState] = useState(
    { usuario: "", contrasena: ""}
  )
  const router = useRouter();

  // Función para manejar cambios en los campos de entrada
  function mngmtChange(e) {
    console.log(e.target.name, e.target.value)
    setState({ ...state, [e.target.name]: e.target.value })
  }

  // Función para validar el inicio de sesión
  const validarLogeo = async (e) => {
    e.preventDefault(); 

    const { usuario, contrasena } = state;
  
    // Verificar si es un administrador
    const admin = Object.values(Admins).find(
      admin => admin.correo === usuario && admin.contrasena === contrasena
    );
  
    // Verificar si es un alumno
    const alumno = Object.values(Usuario).find(
      alumno => alumno.correo === usuario && alumno.password === contrasena
    );
  
    if (admin) {
      // Usuario es un administrador
      router.push(`/blog/admin/${admin.correo}/paginaPrincipalAdmin`);
    } else if (alumno && alumno.correo === usuario && alumno.password === contrasena) {
      // Usuario es un alumno
      router.push(`/blog/alumno/${alumno.correo}/paginaPrincipalAlumno`);
    } else {
      // No coincide la contraseña o usuario
      alert('No coincide la contraseña o usuario');
    }
  }

  return (
    <>
      <div className="title">Sistema de reserva de libros</div>
      <div className="container">
        <div className="form-container">
          <form onSubmit={validarLogeo}> 
            <div className="input-container">
              <label className="form-label" htmlFor="usuario">Usuario o correo:</label>
              <input className="form-input" type="text" id="usuario" name="usuario" onChange={mngmtChange} value={state.usuario} required/>
            </div>
            <div className="input-container">
              <label className="form-label" htmlFor="contrasena">Contraseña:</label>
              <input className="form-input" type="password" id="contrasena" name="contrasena" onChange={mngmtChange} value={state.contrasena} required/>
            </div>
            <div className="forgot-password-container">
              <Link href="/recover-password">Olvidé mi contraseña</Link>
            </div>

            <div className="button-container">
              <Link href="/register"><button className="login-button">Registrar usuario</button></Link>
              <button className="register-button" type="submit">Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Logear;
