import Link from 'next/link';
import { useState } from "react";
import { useRouter } from 'next/router';

import Administradores from '/src/datos/administradores.json';
import Usuarios from '/src/datos/usuario.json';

const Login = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    contrasena: "",
  });
  const router = useRouter();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { usuario, contrasena } = formData;

    const admin = Object.values(Administradores).find(
      admin => admin.correo === usuario && admin.contrasena === contrasena
    );

    const user = Object.values(Usuarios).find(
      user => user.correo === usuario && user.password === contrasena
    );

    if (admin) {
      router.push(`/index/admin/${admin.correo}/paginaPrincipalAdmin`);
    } else if (user && user.correo === usuario && user.password === contrasena) {
      router.push(`/index/alumno/${user.correo}/paginaPrincipalAlumno`);
    } else {
      alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  }

  return (
    <div className="container">
      <div className="title">Sistema de Reserva de Libros</div>
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label className="form-label" htmlFor="usuario">Usuario o Correo:</label>
            <input
              className="form-input"
              type="text"
              id="usuario"
              name="usuario"
              onChange={handleInputChange}
              value={formData.usuario}
              required
            />
          </div>
          <div className="input-container">
            <label className="form-label" htmlFor="contrasena">Contraseña:</label>
            <input
              className="form-input"
              type="password"
              id="contrasena"
              name="contrasena"
              onChange={handleInputChange}
              value={formData.contrasena}
              required
            />
          </div>
          <div className="forgot-password-container">
            <Link href="/recover-password">Olvidé mi contraseña</Link>
          </div>
          <div className="button-container">
            <Link href="/register">
              <button className="login-button">Registrar usuario</button>
            </Link>
            <button className="login-button" type="submit">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

