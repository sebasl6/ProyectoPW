import Link from 'next/link'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router';
import Alumno from 'src/datos/usuario.json';
import React, { useState, useEffect } from 'react';

//paginaPerfilAlumno.js
const Principal = () => {
  var data
  const router = useRouter();
  const { usuario } = router.query;
  let alumnoEncontrado = null;

  Object.keys(Alumno).forEach(clave => {
    const alumni = Alumno[clave];
    if (alumni.correo === usuario) {
      alumnoEncontrado = alumni;
    }
  });


  let nombreDelAlumno = alumnoEncontrado ? alumnoEncontrado.nombres : 'anonomous';
  let primernombre = "";  

  if (nombreDelAlumno) {
    const nombreAlumnoArray = nombreDelAlumno.split(' '); 
    primernombre = nombreAlumnoArray[0];
  }


  //LOGICA PARA CARGAR IMAGEN
  const [imagenURL, setImagenURL] = useState(null);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagenURL(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // Estado local para los campos de entrada
  const [nombre, setNombre] = useState('');
  const [tipoDOC, setTipoDOC] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [nroDocumento, setNroDocumento] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');


  // Cargar información del alumno desde el archivo JSON cuando el componente se monte
  useEffect(() => {
    if (alumnoEncontrado) {
      setNombre(alumnoEncontrado.nombres);
      setTipoDOC(alumnoEncontrado.tipoDocumento);
      setApellidos(alumnoEncontrado.apellidos);
      setNroDocumento(alumnoEncontrado.nroDocumento);
      setCorreo(alumnoEncontrado.correo);
      setPassword(alumnoEncontrado.password);
      setImagenURL(alumnoEncontrado.imagenURL);
    }
  }, [alumnoEncontrado]);

  async function doLeer(){
    const opciones = {
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json'
      }
    }

    const peticion = await fetch( '../../../api/actualizarRegistros/leerUsuario', opciones)
    data = await peticion.json()
    console.log(data)
    return data
  }

  async function repetido(){
    try {
      await handleGuardarClick();
      alert("Se ha registrado correctamente");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert("El correo electronico ya existe. Por favor, inténte con otro.");
    }
  }
  // Función para actualizar el archivo JSON con los nuevos datos
  async function actualizarJSON(nuevosDatos) {
    if (alumnoEncontrado) {
      const nuevosAlumno = Alumno.map(alumni => {
        if (alumni.correo === usuario) {
          return { ...alumni, ...nuevosDatos };
        }
        return alumni;
      });

      // Realiza la solicitud para guardar el nuevo JSON en el servidor
      const opciones = {
        method: 'POST',
        body: JSON.stringify(nuevosAlumno),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const peticion = await fetch('/api/actualizarAlumno/escribir', opciones);
      const data = await peticion.json();
      console.log(data);
    }
  }

  // Maneja el clic en el botón "Guardar" para actualizar los datos
  async function handleGuardarClick () {
    // Obtén los nuevos datos ingresados por el usuario desde el estado local
    const nuevosDatos = {
      correo: correo,
      password: password,
    };

    let datos = await doLeer ()

    const correoExistente = datos.find((user) => user.correo === nuevosDatos.correo);
    if (correoExistente) {
      return error;
    }

    // Llama a la función para actualizar el archivo JSON con los nuevos datos
    actualizarJSON(nuevosDatos);

    window.location.href = "/login";
  };

  async function handleGuardarClick1 () {
    // Obtén los nuevos datos ingresados por el usuario desde el estado local
    const nuevosDatos = {
      nombres: nombre,
      tipoDocumento: tipoDOC,
      apellidos: apellidos,
      nroDocumento,
      imagenURL,
    };
    // Llama a la función para actualizar el archivo JSON con los nuevos datos
    actualizarJSON(nuevosDatos);
    alert("Se ha registrado correctamente");   

    window.location.href = "/login";
  };


  //logica para cambiar de opcion
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('datosPersonales'); 
  const handleOpcionClick = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  return (
    <>
      <Layout content={
        <>
          <div className="contenidoizquierda">
            <div className="opciones">
              <ul>
                <li><Link href={`/index/alumno/${usuario}/paginaPrincipalAlumno`}>Principal</Link></li>
                <li><Link href={`/index/alumno/${usuario}/paginaPerfilAlumno`}>Perfil</Link></li>
                <li><Link href={`/index/alumno/${usuario}/paginaResultadosAlumno`}>Préstamos</Link></li>
              </ul>
            </div>
            <p className="version">Biblio v1.0.1-Alpha</p>
          </div>
          <div className="seccion-titulo">
            <h2>Hola, {primernombre}!</h2>
          </div>
          <div className="linea"></div>
          <div className="seccion-perfil">
            <div className="imagen-admin">
              {imagenURL && (
                <><img
                  src={imagenURL}
                  alt="Imagen del alumno"
                  id="imagenAdmin"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                  }} /><h1></h1><input
                  type="file"
                  id="cargarImagen"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImagenChange}
                /><label htmlFor="cargarImagen">Cargar imagen</label></>
              )}
              {!imagenURL && (
                <>
                  <input
                    type="file"
                    id="cargarImagen"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImagenChange}
                  />
                  <label htmlFor="cargarImagen">Cargar imagen</label>
                </>
              )}
            </div>
            <div className="opciones2">
              {/* Parte superior de las opciones */}
              <div className="opciones-superior">
                <button
                  className={`opcion${opcionSeleccionada === 'datosPersonales' ? ' opcion-activa' : ''}`}
                  onClick={() => handleOpcionClick('datosPersonales')}
                >
                  DATOS PERSONALES
                </button>
                <button
                  className={`opcion${opcionSeleccionada === 'cuenta' ? ' opcion-activa' : ''}`}
                  onClick={() => handleOpcionClick('cuenta')}
                >
                  CUENTA
                </button>
              </div>
              {/* Contenido de las opciones */}
              <div className="opciones-contenido">
                {opcionSeleccionada === 'datosPersonales' && (
                  <div className="column-2">
                    <div className="input-container-2" >
                      <label className="form-label-2" htmlFor="nombre">Nombres:</label>
                      <input
                        className="form-input-2"
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="input-container-2" >
                      <label className="form-label-2" htmlFor="tipoDOC">Tipo de Documento:</label>
                      <input
                        className="form-input-2"
                        type="text"
                        id="tipoDOC"
                        name="tipoDOC"
                        required
                        value={tipoDOC}
                        onChange={(e) => setTipoDOC(e.target.value)}
                      />
                    </div>
                    <div className="input-container-2" >
                      <label className="form-label-2" htmlFor="apellidos">Apellidos:</label>
                      <input
                        className="form-input-2"
                        type="text"
                        id="apellidos"
                        name="apellidos"
                        required
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                      />
                    </div>
                    <div className="input-container-2" >
                      <label className="form-label-2" htmlFor="nroDocumento">Nro. de Documento:</label>
                      <input
                        className="form-input-2"
                        type="text"
                        id="nroDocumento"
                        name="nroDocumento"
                        required
                        value={nroDocumento}
                        onChange={(e) => setNroDocumento(e.target.value)}
                      />
                    </div>
                    <div className="button-container-2" >
                      <button className="register-button-2" onClick={handleGuardarClick1}>Guardar</button>
                    </div>
                  </div>
                )}
                {opcionSeleccionada === 'cuenta' && (
                  <div className="column-2">
                    <div className="input-container-2" >
                      <label className="form-label-2" htmlFor="correo">Correo:</label>
                      <input
                        className="form-input-2"
                        type="email"
                        id="correo"
                        name="correo"
                        required
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                      />
                    </div>
                    <div className="input-container-2" >
                      <label className="form-label-2" htmlFor="password">Contraseña:</label>
                      <input
                        className="form-input-2"
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="button-container-2" >
                      <button className="register-button-2" onClick={repetido}>Guardar</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      } />
    </>
  )
}

export default Principal;
