import Link from 'next/link'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router';
import Admins from 'src/datos/administradores.json';
import React, { useState, useEffect } from 'react';

const Principal = () => {
  var data
  const router = useRouter();
  const { usuario } = router.query;

  // Buscar el administrador por el usuario
  let administradorEncontrado = null;

  // Recorre el objeto de administradores usando forEach
  Object.keys(Admins).forEach(clave => {
    const admin = Admins[clave];
    if (admin.correo === usuario) {
      administradorEncontrado = admin;
    }
  });

  // Obtén el nombre del administrador
  let nombreDelAdministrador = administradorEncontrado ? administradorEncontrado.nombre : 'anonomous';
  let primernombre = "";  // Inicializamos primernombre como una cadena vacía

  // Verificamos si nombreDelAdministrador no es nulo o indefinido antes de procesarlo
  if (nombreDelAdministrador) {
    const nombreAdministradorArray = nombreDelAdministrador.split(' '); // Dividimos la cadena en palabras
    primernombre = nombreAdministradorArray[0]; // Obtenemos el primer elemento del array
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

    // Recuperar la URL de la imagen del almacenamiento local al cargar la página
    useEffect(() => {
      const storedImagenURL = localStorage.getItem('imagenURL');
      if (storedImagenURL) {
        setImagenURL(storedImagenURL);
      }
    }, []);


  // Estado local para los campos de entrada
  const [nombre, setNombre] = useState('');
  const [tipoDOC, setTipoDOC] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [nroDocumento, setNroDocumento] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [idioma, setIdioma] = useState('');
  const [prefijo, setPrefijo] = useState('');
  const [color, setColor] = useState('');

  // Cargar información del administrador desde el archivo JSON cuando el componente se monte
  useEffect(() => {
    if (administradorEncontrado) {
      setNombre(administradorEncontrado.nombre);
      setTipoDOC(administradorEncontrado.tipoDocumento);
      setApellidos(administradorEncontrado.apellido);
      setNroDocumento(administradorEncontrado.nroDocumento);
      setCorreo(administradorEncontrado.correo);
      setPassword(administradorEncontrado.contrasena);
      setIdioma(administradorEncontrado.idioma);
      setPrefijo(administradorEncontrado.prefijo);
      setColor(administradorEncontrado.color);
      setImagenURL(administradorEncontrado.imagenURL)
    }
  }, [administradorEncontrado]);

  const actualizarDatosLocales=(nuevosDatos)=> {
    setNombre(nuevosDatos.nombres);
    setTipoDOC(nuevosDatos.tipoDocumento);
    setApellidos(nuevosDatos.apellidos);
    setNroDocumento(nuevosDatos.nroDocumento);
    setCorreo(nuevosDatos.correo);
    setPassword(nuevosDatos.password);
  
    // Actualiza la imagenURL solo si se proporciona una nueva imagen
    if (nuevosDatos.imagenURL) {
      setImagenURL(nuevosDatos.imagenURL);
      localStorage.setItem('imagenURL', nuevosDatos.imagenURL);
    }
  };


  const actualizarDatosRemotos = async (nuevosDatos) => {
    if (alumnoEncontrado) {
      const nuevosAlumnos = Object.values(Alumno).map((alumni) => {
        if (alumni.correo === usuario) {
          return { ...alumni, ...nuevosDatos };
        }
        return alumni;
      });
      // Realiza la solicitud para guardar el nuevo JSON en el servidor
      const opciones = {
        method: 'POST',
        body: JSON.stringify(nuevosAlumnos),
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const peticion = await fetch('/api/actualizarAlumno/escribir', opciones);
      const data = await peticion.json();
      console.log(data);
    }
  };


  async function doLeer(){
    const opciones = {
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json'
      }
    }

    const peticion = await fetch( '../../../api/actualizarRegistros/leerAdmin', opciones)
    data = await peticion.json()
    console.log(data)
    return data
  }

  async function repetido(){
    try {
      await handleGuardarClick();
      alert("Se ha actualizado correctamente");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert("El correo electronico ya existe. Por favor, inténte con otro.");
    }
  }


  // Maneja el clic en el botón "Guardar" para actualizar los datos
async function handleGuardarClick() {
    // Obtén los nuevos datos ingresados por el usuario desde el estado local
    const nuevosDatos = {
      correo,
      contrasena: password,
    };

    let datos = await doLeer ()

    const correoExistente = datos.find((user) => user.correo === nuevosDatos.correo);
    if (correoExistente) {
      return error;
    }

    actualizarDatosLocales(nuevosDatos);

  // Llama a la función para actualizar los datos en el servidor
    actualizarDatosRemotos(nuevosDatos);
    
    window.location.href = "/login";
  };



  const handleGuardarClick2 = () => {
    const nuevosDatos = {
      nombre,
      tipoDocumento: tipoDOC,
      apellido: apellidos,
      nroDocumento,
      imagenURL,
    };
  
    // Llama a la función para actualizar los datos localmente
    actualizarDatosLocales(nuevosDatos);

    // Llama a la función para actualizar los datos en el servidor
    actualizarDatosRemotos(nuevosDatos);
  
      alert("Se ha registrado correctamente");   
  
    };

  const handleGuardarClick3 = () => {
    const nuevosDatos = {
      idioma,
      prefijo,
      color,
    };
      // Llama a la función para actualizar los datos localmente
      actualizarDatosLocales(nuevosDatos);

      // Llama a la función para actualizar los datos en el servidor
      actualizarDatosRemotos(nuevosDatos);
    
        alert("Se ha registrado correctamente");   
    
      };

  //logica para cambiar de opcion
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('datosPersonales'); // Estado para la opción seleccionada
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
                <li><Link href={`/index/admin/${usuario}/paginaPrincipalAdmin`}>Inicio</Link></li>
                <li><Link href={`/index/admin/${usuario}/paginaPerfilAdmin`}>Perfil</Link></li>
                <li><Link href={`/index/admin/${usuario}/paginaResultadosAdmin`}>Bibliotecas</Link></li>
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
                  alt="Imagen del administrador"
                  id="imagenAdmin"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px', // Ajusta la altura máxima de la imagen según tus necesidades
                  }} /><h1></h1><input
                    type="file"
                    id="cargarImagen"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImagenChange} /><label htmlFor="cargarImagen">Cargar imagen</label></>
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
                <button
                  className={`opcion${opcionSeleccionada === 'preferencia' ? ' opcion-activa' : ''}`}
                  onClick={() => handleOpcionClick('preferencia')}
                >
                  PREFERENCIA
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
                      <button className="register-button-2" onClick={handleGuardarClick2}>Guardar</button>
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
                {opcionSeleccionada === 'preferencia' && (
                  <div className="column-2">
                    <div className="input-container-2" >
                      <label className="form-label-2" htmlFor="idioma">Idioma:</label>
                      <input
                        className="form-input-2"
                        type="text"
                        id="idioma"
                        name="idioma"
                        required
                        value={idioma}
                        onChange={(e) => setIdioma(e.target.value)}
                      />
                    </div>
                    <div className="input-container-2" >
                      <label className="form-label-2" htmlFor="prefijo">Prefijo:</label>
                      <input
                        className="form-input-2"
                        type="text"
                        id="prefijo"
                        name="prefijo"
                        required
                        value={prefijo}
                        onChange={(e) => setPrefijo(e.target.value)}
                      />
                    </div>
                    <div className="input-container-2" >
                      <label className="form-label-2" htmlFor="color">Color:</label>
                      <input
                        className="form-input-2"
                        type="text"
                        id="color"
                        name="color"
                        required
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>
                    <div className="button-container-2" >
                      <button className="register-button-2" onClick={handleGuardarClick3}>Guardar</button>
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


