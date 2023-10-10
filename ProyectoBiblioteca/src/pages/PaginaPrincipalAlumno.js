import Link from 'next/link'
import Head from 'next/head'
import Layout from '@/components/layout'
import { useRouter } from 'next/router';
import Alumno from '@/usuarios.json';

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
  return (
    <>
      <Layout content={
        <>
          <div className="contenidoizquierda">
            <div className="opciones">
              <ul>
                <li><Link href={`/blog/admin/${usuario}/paginaPrincipalAlumno`}>Principal</Link></li>
                <li><Link href={`/blog/admin/${usuario}/paginaPerfilAlumno`}>Perfil</Link></li>
                <li><Link href={`/blog/admin/${usuario}/paginaResultadosAlumno`}>Préstamos</Link></li>
              </ul>
            </div>
            <p className="version">Biblio v1.0.1-Alpha</p>
          </div>
          <div className="seccion-titulo">
            <h2>Bienvenido, {primernombre}!</h2>
          </div>
          <div className="linea2"></div>
          <div className="seccion-igual-1">
            <div class="titulo">Últimas reservas</div>
            <div class="cartas_fila">
              <div class="carta">
                <div class="contenido">
                  <h2>Reserva 1</h2>
                  <p>Información de la primera reserva.</p>
                </div>
              </div>
              <div class="carta">
                <div class="contenido">
                  <h2>Reserva 2</h2>
                  <p>Información de la segunda reserva.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="seccion-igual-2">123</div>
        </>
      } />
    </>
  )
}

export default Principal;
