import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import LayoutCasoBusquedaAlumno from '@/components/LayoutCasoBusquedaAlumno';
import { useRouter } from 'next/router';
import Usuario from 'src/datos/usuario.json';

//paginaResultadosAlumno.js
const Principal = () => {
  const router = useRouter();
  const { usuario } = router.query;

  // Estado local para el valor de la casilla de búsqueda y checkboxes
  const [busqueda, setBusqueda] = useState('');
  const [checkboxes, setCheckboxes] = useState({
    titulo: false,
    autor: false,
    serie: false,
    isbn: false,
  });

  // Función para limpiar la búsqueda y deseleccionar los checkboxes
  const limpiarBusqueda = () => {
    setBusqueda('');
    setCheckboxes({  
      titulo: false,
      autor: false,
      serie: false,
      isbn: false,
    });
  };


  const buscar = () => {

    const queryParams = {
      busqueda,
      checkboxes: JSON.stringify(checkboxes), 
    };

    router.push({
      pathname: `/index/alumno/${usuario}/paginaBusquedaLibroAlumno`, 
      query: queryParams,
    });
  };

  let alumnoEncontrado = null;

  Object.keys(Usuario).forEach(clave => {
    const alumnoO = Usuario[clave];
    if (alumnoO.correo === usuario) {
      alumnoEncontrado = alumnoO;
    }
  });

  const nombredelAlumno = alumnoEncontrado ? alumnoEncontrado.nombres : 'ANONIMO';

  return (
    <>
      <LayoutCasoBusquedaAlumno content={
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
          <div className="seccion-titulo-resultados">
            <div className="titulo">
              <h2>Búsqueda</h2>
            </div>
          </div>
          <div className="linea2"></div>
          <div className='seccion-resultados-alum'>
            <div className='casilla-para-escribir'>
              <label className='form-label-3' htmlFor='contrasena'>
                Ingresa la palabra clave
                <div className='icono'>
                  <img src='/Icon.png' alt='Icono' />
                </div>
              </label>
              <input
                className='form-input-4'
                type='text'
                id='recurso'
                name='recurso'
                placeholder='Buscar por título'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className='checkbox-boton'>
              <div className='checkbox-titulo'>
                <b>Incluir búsqueda en:</b>
                <div className='chexboxx'>
                  <input
                    type='checkbox'
                    name='titulo'
                    checked={checkboxes.titulo}
                    onChange={() =>
                      setCheckboxes({ ...checkboxes, titulo: !checkboxes.titulo })
                    }
                  />
                  Título
                </div>
                <div className='chexboxx'>
                  <input
                    type="checkbox"
                    name="autor"
                    checked={checkboxes.autor} 
                    onChange={() => setCheckboxes({ ...checkboxes, autor: !checkboxes.autor })} 
                  />
                  Autor, Autores
                </div>
                <div className='chexboxx'>
                  <input
                    type="checkbox"
                    name="serie"
                    checked={checkboxes.serie} 
                    onChange={() => setCheckboxes({ ...checkboxes, serie: !checkboxes.serie })} 
                  />
                  Serie
                </div>
                <div className='chexboxx'>
                  <input
                    type="checkbox"
                    name="isbn"
                    checked={checkboxes.isbn} 
                    onChange={() => setCheckboxes({ ...checkboxes, isbn: !checkboxes.isbn })} 
                  />
                  ISBN
                </div>
              </div>
              <div className='botones'>
                <button className='boton-limpiar' onClick={limpiarBusqueda}>
                  Limpiar
                </button>
                <button className='boton-buscar' onClick={buscar}>
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </>
      } />
    </>
  )
}

export default Principal;
