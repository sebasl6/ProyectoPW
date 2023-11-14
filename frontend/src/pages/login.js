import Link from 'next/link';
//Gestiona el estado del formulario de inicio de seccion
import { useState } from "react";
//Accede a la informacion de la ruta actual
import { useRouter } from 'next/router';
// Contiene la informacion sobre administrador y usuario
import Administradores from '/src/datos/administradores.json';
import Usuarios from '/src/datos/usuario.json';
// Se almacena los valores del usuario y contraseña del formulario
const Login = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    contrasena: "",
  });
  const router = useRouter();
//Captura los cambios en los campos de entrada del formulario y actualiza el estado de formdata
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
//Se obtiee los valores del usuario y la contraseña del estado formdata
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

