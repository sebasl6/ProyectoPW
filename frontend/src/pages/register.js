import Link from 'next/link';
import Head from 'next/head';
import { useState } from "react";
import userApi from './api/alumno.js'; // Ajusta la ruta a tu ubicación real

const Formulario = () => {
  const [isValid, setIsValid] = useState(true);
  const [state, setState] = useState({
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    nroDocumento: "",
    correo: "",
    password: "",
    repetirPassword: ""
  });

  const mngmtChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const mngmtSubmit = async (e) => {
    e.preventDefault();
  
    if (state.password !== state.repetirPassword) {
      setIsValid(false);
      alert('No coincide la contraseña');
      return;
    }
  
    setIsValid(true);
  
    console.log("Datos del usuario:", state);
  
    try {
      // Obtener la lista de usuarios existentes
      const existingUsersResponse = await userApi.findAll();
      console.log("Respuesta de la API:", existingUsersResponse);
  
      // Asegúrate de que existingUsersResponse sea un array antes de intentar usar find.
      const existingUsers = Array.isArray(existingUsersResponse) ? existingUsersResponse : [];
  
      // Verificar si el correo ya existe
      const correoExistente = existingUsers.find((user) => user.correo === state.correo);
      if (correoExistente) {
        alert("El correo electrónico ya existe. Por favor, inténtalo con otro.");
        return;
      }
  
      // Crear un nuevo usuario
      const newUser = {
        nombres: state.nombres,
        apellidos: state.apellidos,
        tipoDocumento: state.tipoDocumento,
        nroDocumento: state.nroDocumento,
        correo: state.correo,
        password: state.password,
        repetirPassword: state.repetirPassword,
      };
  
      console.log("Nuevo usuario:", newUser);
  
      // Guardar nuevo usuario
      await userApi.add(newUser);
  
      alert("Se ha registrado correctamente");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert("Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.");
    }
  }
  
  
  return (
    <>
      <div className="title">Sistema de Reserva de Libros</div>
      <div className="subtitle">Registro de Usuario</div>
      <div className="container">
        <form onSubmit={mngmtSubmit}>
          <div className="center-container">
            <div className="column">
              <div className="columna-subtitulo">Datos personales</div>
              <div className="input-container">
                <label className="form-label" htmlFor="nombres">Nombres:</label>
                <input
                  className="form-input"
                  type="text"
                  id="nombres"
                  name="nombres"
                  onChange={mngmtChange}
                  value={state.nombres}
                  required
                />
              </div>
              <div className="input-container">
                <label className="form-label" htmlFor="apellidos">Apellidos:</label>
                <input
                  className="form-input"
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  onChange={mngmtChange}
                  value={state.apellidos}
                  required
                />
              </div>
              <div className="input-container">
                <label className="form-label" htmlFor="tipoDocumento">Tipo de Documento:</label>
                <input
                  className="form-input"
                  type="text"
                  id="tipoDocumento"
                  name="tipoDocumento"
                  onChange={mngmtChange}
                  value={state.tipoDocumento}
                  required
                />
              </div>
              <div className="input-container">
                <label className="form-label" htmlFor="nroDocumento">Nro de Documento:</label>
                <input
                  className="form-input"
                  type="text"
                  id="nroDocumento"
                  name="nroDocumento"
                  onChange={mngmtChange}
                  value={state.nroDocumento}
                  required
                />
              </div>
            </div>
            <div className="column">
              <div className='columna-subtitulo'>Datos de la cuenta</div>
              <div className="input-container">
                <label className="form-label" htmlFor="correo">Correo Electrónico:</label>
                <input
                  className="form-input"
                  type="email"
                  id="correo"
                  name="correo"
                  onChange={mngmtChange}
                  value={state.correo}
                  required
                />
              </div>
              <div className="input-container">
                <label className="form-label" htmlFor="password">Password:</label>
                <input
                  className="form-input"
                  type="password"
                  id="password"
                  name="password"
                  onChange={mngmtChange}
                  value={state.password}
                  required
                />
              </div>
              <div className="input-container">
                <label className="form-label" htmlFor="repetirPassword">Repetir Password:</label>
                <input
                  className="form-input"
                  type="password"
                  id="repetirPassword"
                  name="repetirPassword"
                  onChange={mngmtChange}
                  value={state.repetirPassword}
                  required
                />
              </div>
              <div className="button-container">
                <button className="register-button">Registrar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Formulario;
