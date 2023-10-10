import Link from 'next/link';
import Head from 'next/head';

import { useState } from "react";

const FormularioModificado = () => {
  // Estado para manejar la validación de contraseñas
  const [isValid, setIsValid] = useState(true);

  const [formData, setFormData] = useState(
    { nombres: "", apellidos: "", tipoDocumento: "", nroDocumento: "", correo: "", password: "", repetirPassword: "" }
  );

  function handleChange(e) {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Lógica para validar la contraseña
    if (formData.password !== formData.repetirPassword) {
      setIsValid(false);
      alert('Las contraseñas no coinciden');
      return;
    }
    setIsValid(true);
    let formDataObject = new FormData();
    for (let [key, value] of Object.entries(formData)) {
      formDataObject.append(key, value);
    }
    // Una vez que se ha cargado el formDataObject, se envía el formulario normalmente usando fetch (backend)...
    console.log(formDataObject);

    // Redirigir a la página de inicio si las contraseñas coinciden
    window.location.href = "/";
    alert("Se ha registrado correctamente");
  }

  const enviarDatos = async () => {
    let formDataObject = new FormData();
    for (let [key, value] of Object.entries(formData)) {
      formDataObject.append(key, value);
    }

    // Generar mapa con los valores
    let params = new Map([]);
    formDataObject.forEach((value, key) => {
      params.set(key, value);
    });

    // Generar un objeto JSON a través de ese mapa
    let jsonObject = {};
    params.forEach((value, key) => { jsonObject[key] = value; });
    console.log(JSON.stringify(jsonObject));

    // Invocar a la API
    try {
      const req = await fetch(
        `/src/api/registro`,
        {
          method: 'POST',
          body: JSON.stringify({ jsonObject }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await req.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Head>
        <title>Registro de Usuario Modificado</title>
      </Head>
      <div className="title">Sistema de Reserva de Libros</div>
      <div className="subtitle">Registro de Usuario</div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="center-container">
            <div className="column">
              <div className="column-subtitle" >Información personal</div>
              <div className="input-container" onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="nombres">Nombres:</label>
                <input className="form-input" type="text" id="nombres" name="nombres" onChange={handleChange} value={formData.nombres} required />
              </div>
              <div className="input-container" onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="apellidos">Apellidos:</label>
                <input className="form-input" type="text" id="apellidos" name="apellidos" onChange={handleChange} value={formData.apellidos} required />
              </div>
              <div className="input-container" onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="tipoDocumento">Tipo de Documento:</label>
                <input className="form-input" type="text" id="tipoDocumento" name="tipoDocumento" onChange={handleChange} value={formData.tipoDocumento} required />
              </div>
              <div className="input-container" onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="nroDocumento">Nro de Documento:</label>
                <input className="form-input" type="text" id="nroDocumento" name="nroDocumento" onChange={handleChange} value={formData.nroDocumento} required />
              </div>
            </div>

            <div className="column">
              <div className='column-subtitle' >Datos de la cuenta</div>
              <div className="input-container" onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="correo">Correo Electrónico:</label>
                <input className="form-input" type="email" id="correo" name="correo" onChange={handleChange} value={formData.correo} required />
              </div>
              <div className="input-container" onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="password">Contraseña:</label>
                <input className="form-input" type="password" id="password" name="password" onChange={handleChange} value={formData.password} required />
              </div>
              <div className="input-container" onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="repetirPassword">Repetir Contraseña:</label>
                <input className="form-input" type="password" id="repetirPassword" name="repetirPassword" onChange={handleChange} value={formData.repetirPassword} required />
              </div>
              <div className="button-container" onSubmit={handleSubmit}>
                <button className="register-button" onClick={enviarDatos}>Registrar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormularioModificado;
