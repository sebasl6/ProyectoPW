import Layout from '@/components/Layout'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Principal = () => {

    const router = useRouter();
    const { usuario } = router.query;
    const [reservas, setReservas] = useState([]);
    const { query } = router;
    const tipousuario = query.tipousuario;
    console.log("TIPO USUARIO: ", tipousuario)

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

    function crearCarta(index, reserva) {
        return (
            <>
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
            </>
        )
    }

    function crearCartaUSER(index, reserva) {
        return (
            <>
                <div className="carta" key={index}>
                    <div className="contenido">
                        <div className='Titulo_card'>
                            <h2 >{reserva.titulo}</h2>
                        </div>
                        <p className='Fecha_card'>{new Date(reserva.fecha).toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })} <span className="User_Card">User: {reserva.usuario.split("@")[0]}</span></p>
                    </div>
                    <div className="imagen">
                        <img src={reserva.portada} alt="portada" className="icono_default" />
                    </div>
                </div>
            </>
        )
    }

    function mostrarLibros(reservas) {
        const resultado = [];

        for (let i = 0; i < reservas.length; i += 2) {
            const cartasFila = (
                <div className='cartas_fila' key={i}>
                    {crearCarta(i, reservas[i])}
                    {i + 1 < reservas.length && (
                        crearCarta(i + 1, reservas[i + 1])
                    )}
                </div>
            );
            resultado.push(cartasFila);
        }

        return resultado;
    }
    function mostrarLibrosADMIN(reservas) {
        const resultado = [];

        for (let i = 0; i < reservas.length; i += 2) {
            const cartasFila = (
                <div className='cartas_fila' key={i}>
                    {crearCartaUSER(i, reservas[i])}
                    {i + 1 < reservas.length && (
                        crearCartaUSER(i + 1, reservas[i + 1])
                    )}
                </div>
            );
            resultado.push(cartasFila);
        }

        return resultado;
    }

    function userORadmin(tipo) {
        if (tipo == "admin") {
            return "Admin"
        } else {
            return "Alumno"
        }
    }

    useEffect(() => {
        obtenerReservas();
    }, []);

    return (
        <>
            <Layout content={
                <>
                    <div className="contenidoizquierda">
                        <div className="opciones">
                            <ul>
                                <li><Link href={`/index/${tipousuario}/${usuario}/paginaPrincipal${userORadmin(tipousuario)}`}>Principal</Link></li>
                                <li><Link href={`/index/${tipousuario}/${usuario}/paginaPerfil${userORadmin(tipousuario)}`}>Perfil</Link></li>
                                <li><Link href={`/index/${tipousuario}/${usuario}/paginaResultados${userORadmin(tipousuario)}`}>Préstamos</Link></li>
                            </ul>
                        </div>
                        <p className="version">Biblio v1.0.1-Alpha</p>
                    </div>
                    <div className="seccion-titulo">
                        <h2>Utimas reservas</h2>
                    </div>
                    <div className="linea2"></div>
                    <div className="ultimas_reservas_pag_block">
                        {tipousuario === "admin" ? (
                            mostrarLibrosADMIN(reservas, 2)
                        ) : mostrarLibros(reservas.filter((libro) => libro.usuario == usuario), 2)}
                    </div>
                </>
            } />
        </>
    )
}

export default Principal;


//
