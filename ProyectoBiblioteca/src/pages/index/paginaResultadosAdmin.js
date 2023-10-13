import Link from 'next/link';
import Head from 'next/head';
import Layout1 from '@/components/Layout1';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Admins from '/administradores.json';
import libraryData from '/library.json';

const Principal = () => {
    const router = useRouter();
    const { usuario } = router.query;

    const [inputText, setInputText] = useState('');
    const [coincidencias, setCoincidencias] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const resultadosPorPagina = 3;

    useEffect(() => {
        if (inputText.trim() === '') {
            setCoincidencias([]);
        } else {
            const coincidenciasFiltradas = libraryData.filter(libro =>
                libro.titulo.toLowerCase().includes(inputText.toLowerCase())
            );
            setCoincidencias(coincidenciasFiltradas);
            setPaginaActual(1);
        }
    }, [inputText]);

    const irAPaginaSiguiente = () => {
        if ((paginaActual + 1) * resultadosPorPagina <= coincidencias.length) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const irAPaginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const indiceInicio = (paginaActual - 1) * resultadosPorPagina;
    const indiceFin = indiceInicio + resultadosPorPagina;

    const [flag, setFlag] = useState(false);
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
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

    useEffect(() => {
        obtenerReservas();
    }, []);

    const eliminarReserva = (libro) => {
        if (libro) {
            // Filtra las reservas para mantener todas menos la reserva asociada al libro en reserva
            const reservasActualizadas = reservas.filter(
                (reserva) => reserva.ISBN13 !== libro.ISBN13
            );

            // Actualiza el estado de las reservas con las reservas actualizadas
            setReservas(reservasActualizadas);

            // Realiza una solicitud POST a la API para actualizar las reservas en el servidor
            fetch('/api/actualizarReserva/escribir', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservasActualizadas),
            })
                .then((response) => response.json())
                .then(() => {
                    obtenerReservas(); // Vuelve a cargar las reservas después de eliminar la reserva
                    setLibroSeleccionado(null); // Establece el libro en reserva como nulo
                    setFlag(false);
                })
                .catch((error) => {
                    console.error('Error al eliminar la reserva:', error);
                });
        }
    };

    const doEscribir = async () => {
        window.location.href = `/blog/admin/${usuario}/paginaInsertarNuevoLibroAdmin`;
    };
    return (
        <>
            <Layout1 content={
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
                    <div className="seccion-titulo-resultados">
                        <div className="titulo">
                            <h2>Biblioteca</h2>
                        </div>
                        <button onClick={doEscribir}>Añadir un nuevo recurso</button>
                    </div>
                    <div className="linea2"></div>
                    <div className="casilla-para-escribir">
                        <label className="form-label-3" htmlFor="contrasena">
                            Ingresa la palabra clave
                            <div className="icono">
                                <img src="/Icon.png" alt="Icono" />
                            </div>
                        </label>
                        <input
                            className="form-input-3"
                            type="text"
                            id="recurso"
                            name="recurso"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Buscar por título"
                        />
                    </div>
                    <div className="seccion-rectangular-gris">
                        {coincidencias.slice(indiceInicio, indiceFin).map((libro, index) => {
                            const reservaExistente = reservas.find(
                                (reserva) => reserva && reserva.ISBN13 === libro.ISBN13
                            );
                            const isBotonDeshabilitado = !!reservaExistente && reservaExistente.disponibilidad === 1;

                            return (
                                <div className="bloque-libro" key={index}>
                                    <div className="titulo-libro">
                                        <h3>{libro.titulo}</h3>
                                    </div>
                                    <div className="imagenes-libro">
                                        {!isBotonDeshabilitado && (
                                            <>
                                                <img src="/media.png" alt="Icono XD" className="icono-xd" />
                                                <img
                                                    src={libro["imagen-portada-url"]}
                                                    alt="Portada del libro"
                                                    className="portada-libro"
                                                />
                                            </>
                                        )}
                                        {isBotonDeshabilitado && (
                                            <>
                                                <img src="/media.png" alt="Icono XD" className="icono-xd" />
                                                <img
                                                    src={libro["imagen-portada-url"]}
                                                    alt="Portada del libro"
                                                    className="portada-libro"
                                                />
                                            </>
                                        )}
                                    </div>
                                    <div className="informacion-libro">
                                        <p><b>ISBN:</b> {libro.ISBN}</p>
                                        <p><b>Autor:</b> <u>{libro.autor}</u></p>
                                        <p><b>Editorial:</b> {libro.editorial}</p>
                                    </div>
                                    {isBotonDeshabilitado && (
                                        <>
                                            <div className="MensajeNoDisp">No disponible</div>
                                            <button onClick={() => eliminarReserva(libro)}>Cancelar</button>
                                        </>
                                    )}
                                    {!isBotonDeshabilitado && (
                                        <button disabled>Reservar</button>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="paginacion">
                        <button onClick={irAPaginaAnterior} disabled={paginaActual === 1}>
                            {'<'}
                        </button>
                        <button onClick={irAPaginaSiguiente} disabled={paginaActual === (Math.ceil((coincidencias.length) / 3)) - 1}>
                            {'>'}
                        </button>
                    </div>

                </>
            } />
        </>
    )
}

export default Principal;
