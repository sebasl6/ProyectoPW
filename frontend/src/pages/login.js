import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import userApi from './api/alumno.js';

const Login = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: '',
  });

  const [isValid, setIsValid] = useState(true);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setIsValid(false);
      return;
    }

    try {
      const response = await userApi.login({
        correo: formData.usuario,
        password: formData.contrasena,
      });

      if (response && response.ok) {
        const userType = response.data.esAdmin ? 'admin' : 'alumno';
        router.push(`/index/${userType}/${response.data.correo}/paginaPrincipal${userType.charAt(0).toUpperCase() + userType.slice(1)}`);
      } else {
        alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      alert('Hubo un error al autenticar. Por favor, inténtalo de nuevo.');
    }
  };

  const validateForm = () => {
    const { usuario, contrasena } = formData;
    return usuario.trim() !== '' && contrasena.trim() !== '';
  };

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
          {!isValid && <p className="error-message">Por favor, completa todos los campos.</p>}
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
};

export default Login;
