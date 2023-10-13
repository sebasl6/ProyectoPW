import Link from 'next/link'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router';
import Admins from '/administradores.json';
import { useState, useEffect } from 'react';

const Principal = () => {
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
    setReservas(data)
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
                <li><Link href={`/blog/admin/${usuario}/paginaPrincipalAdmin`}>Inicio</Link></li>
                <li><Link href={`/blog/admin/${usuario}/paginaPerfilAdmin`}>Perfil</Link></li>
                <li><Link href={`/blog/admin/${usuario}/paginaResultadosAdmin`}>Bibliotecas</Link></li>
              </ul>
            </div>
            <p className="version">Biblio v1.0.1-Alpha</p>
          </div>
          <div className="seccion-titulo">
            <h2>Bienvenido, {primernombre}!</h2>
          </div>
          <div className="linea"></div>
          <div className="seccion-igual-1">
            <div class="titulo_seccion">Últimas reservas</div>
            <div class="cartas_fila">
              {reservas.slice(-2).map((reserva, index) => (
                <div className="carta" key={index}>
                  <div className="contenido">
                    <div className='Titulo_card'>
                      <h2>{reserva.titulo}</h2></div>
                    <p className='Fecha_card'>{new Date(reserva.fecha).toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })} <span class="User_Card">User: {reserva.usuario.split("@")[0]}</span></p>
                  </div>
                  <div className="imagen">
                    <img src={reserva.portada} alt="portada" className="icono_default" />
                  </div>
                </div>
              ))}
            </div>
            <Link href={`/blog/admin/${usuario}/paginaUltimasReservas`} class="ver-todo">Ver todo</Link>
          </div>

          <div className="seccion-igual-2">
            <div class="titulo_seccion">Los más pedidos</div>
            <div class="cartas_fila">
              {stats.slice(0, 2).map((libro, index) => (
                <div className="carta" key={index}>
                  <div className="contenido">
                    <div className='Titulo_card'>
                      <h2>{libro.titulo}</h2>
                    </div>
                    <p className='Fecha_card'>{libro.autor}</p>
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
