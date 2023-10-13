import Link from 'next/link'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router';
import Alumno from '/src/datos/usuario.json';
import { useState, useEffect } from 'react';

const Principal = () => {
  const router = useRouter();
  const { usuario } = router.query;

  // Buscar el administrador por el usuario
  let alumnoEncontrado = null;

  // Recorre el objeto de administradores usando forEach
  Object.keys(Alumno).forEach(clave => {
    const alumni = Alumno[clave];
    if (alumni.correo === usuario) {
      alumnoEncontrado = alumni;
    }
  });

  // Obtén el nombre del alumno
  let nombreDelAlumno = alumnoEncontrado ? alumnoEncontrado.nombres : 'anonomous';
  let primernombre = "";  // Inicializamos primernombre como una cadena vacía

  // Verificamos si nombreDelAlumno no es nulo o indefinido antes de procesarlo
  if (nombreDelAlumno) {
    const nombreAlumnoArray = nombreDelAlumno.split(' '); // Dividimos la cadena en palabras
    primernombre = nombreAlumnoArray[0]; // Obtenemos el primer elemento del array
  }
  //------- ULTIMOS RESERVADOS --------------------
  const [reservas, setReservas] = useState([]);

  async function obtenerReservas() {
    const opciones = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
    const peticion = await fetch('/api/actualizarReserva/leer', opciones)
    let data = await peticion.json()
    console.log("Peticion_data:", JSON.stringify(data))
    data.sort((a, b) => {
      const fechaA = new Date(a.fechaentrega);
      const fechaB = new Date(b.fechaentrega);
      return fechaA - fechaB;
    })
    setReservas(data)
    console.log("Reservas ordenadas: ", data)
  }

  const [stats, setStats] = useState([])

  async function leerStats() {
    const opciones = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
    const peticion = await fetch('/api/actualizarStats/leer', opciones)
    let data = await peticion.json()
    console.log("Peticion_data STATS:", JSON.stringify(data))
    data.sort((a, b) => parseInt(b.numReservas) - parseInt(a.numReservas));
    setStats(data)
    console.log("ORDERED STATS:", JSON.stringify(data))
  }


  useEffect(() => {
    obtenerReservas();
    leerStats();
  }, []);

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
            <h2>Bienvenido, {primernombre}!</h2>
          </div>
          <div className="linea2"></div>
          <div className="seccion-igual-1">
            <div class="titulo_seccion">Últimas reservas</div>
            <div class="cartas_fila">
              {reservas.filter((libro) => libro.usuario == usuario).slice(-2).reverse().map((reserva, index) => (
                <div className="carta" key={index}>
                  <div className="contenido">
                    <div className='Titulo_card'>
                      <h2>{reserva.titulo}</h2></div>
                    <p className='Fecha_card'>{new Date(reserva.fecha).toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })}</p>
                  </div>
                  <div className="imagen">
                    <img src={reserva.portada} alt="portada" className="icono_default" />
                  </div>
                </div>
              ))}
            </div>
            <Link href={`/index/alumno/${usuario}/paginaUltimasReservas`} class="ver-todo">Ver todo</Link>
          </div>

          <div className="seccion-igual-2">
            <div class="titulo_seccion">Proximos a vencer</div>
            <div class="cartas_fila">
              {reservas.filter((libro) => libro.usuario == usuario).slice(-2).map((libro, index) => (
                <div className="carta" key={index}>
                  <div className="contenido">
                    <div className='Titulo_card'>
                      <h2>{libro.titulo}</h2></div>
                    <p className='Fecha_card'>Fecha limite: {new Date(libro.fechaentrega).toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })}</p>
                  </div>
                  <div className="imagen">
                    <img src={libro.portada} alt="/media.png" className="icono_default" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      } />
    </>
  )
}

export default Principal;
