import Link from 'next/link';
import Head from 'next/head';
import Layout1 from '@/components/Layout1';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import libraryData from 'src/datos/library.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//paginaBusquedaLibroAlumno.js
const Principal = () => {
    const [datos, setDatos] = useState([])
    const router = useRouter();
    const { usuario } = router.query;
    const { busqueda, checkboxes } = router.query;

    // Convierte los valores de los checkboxes en un objeto booleano
    const checkboxesObj = checkboxes
        ? JSON.parse(checkboxes)
        : { titulo: false, autor: false, serie: false, isbn: false };

    const [coincidencias, setCoincidencias] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const resultadosPorPagina = 3;

    useEffect(() => {
        if (busqueda !== '') {
            // Filtra las coincidencias basadas en la variable "busqueda"
            const coincidenciasFiltradas = libraryData.filter((libro) =>
            libro.titulo.toLowerCase().includes(busqueda? busqueda.toLowerCase() : '')
            );
            setCoincidencias(coincidenciasFiltradas);
            // Al cambiar la variable "busqueda", vuelve a la página 1
            setPaginaActual(1);
        } else {
            // Si la variable "busqueda" está vacía, muestra ninguna coincidencia
            setCoincidencias([]);
        }
    }, [busqueda]);

    //Paginacion
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

    // Calcula los índices de inicio y fin para mostrar los resultados de la página actual
    const indiceInicio = (paginaActual - 1) * resultadosPorPagina;
    const indiceFin = indiceInicio + resultadosPorPagina;


    //
    const doVolver = async () => {
        window.location.href = `/index/alumno/${usuario}/paginaResultadosAlumno`;
    };

    const doReservas = async () => {
        window.location.href = `/index/alumno/${usuario}/paginaUltimasReservas`;
    };

    //Calendario

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    //

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
        leerStats();
    }, []);

    const reservar = (libro) => {
        setFlag(true);
        setLibroSeleccionado(libro);
    };

    const [stats, setStats] = useState([])
    async function leerStats() {
        const opciones = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        const peticion = await fetch('/api/actualizarStats/leer', opciones)
        const data = await peticion.json()
        setStats(data)

    }
    async function editStats() {
        const libroStats = stats.find((libro) => libro.titulo === libroSeleccionado.titulo)
        if (!libroStats) {
            const nuevoStat = {
                numReservas: "1",
                titulo: libroSeleccionado.titulo,
                autor: libroSeleccionado.autor,
                portada: libroSeleccionado["imagen-portada-url"],
            }
            let data = stats
            data.push(nuevoStat)
            setStats(data)
        } else {
            stats.forEach((libro) => {
                if (libro.titulo == libroSeleccionado.titulo) {
                    libro.numReservas = String(parseInt[libro.numReservas] + 1)
                    console.log("Libro numReservas modificado")
                }
            })
        }
        const opcionesPost = {
            method: 'POST',
            body: JSON.stringify(stats),
            headers: { 'Content-Type': 'application/json' }
        }
        const peticionPost = await fetch('/api/actualizarStats/escribir', opcionesPost)
        let rpta = await peticionPost.json()
        console.log("Stats modificadas: ", rpta)
    }

    const [showMessage, setShowMessage] = useState(false);
    const [fechaentrega, setFechaEntrega] = useState(null);
    const registrarReserva = async () => {
        if (libroSeleccionado) {
            // Crea un objeto de reserva con la fecha, usuario y título del libro
            const fechaEntrega = new Date(selectedDate);
            fechaEntrega.setDate(fechaEntrega.getDate() + 30);
            setFechaEntrega(fechaEntrega.toDateString());
            const reserva = {
                fecha: selectedDate.toISOString(),
                usuario: usuario,
                ISBN13: libroSeleccionado.ISBN13,
                titulo: libroSeleccionado.titulo,
                disponibilidad: 1,
                fechaentrega: fechaEntrega.toISOString(),
                portada: libroSeleccionado["imagen-portada-url"]
            };

            const updatedReservas = [...reservas, reserva]; 
            setReservas(updatedReservas);
            try {
                const response = await fetch('/api/actualizarReserva/escribir', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedReservas),
                });
                editStats();
                obtenerReservas();
            } catch (error) {
                console.error('Error al realizar la solicitud API:', error);
            }

            setSelectedDate(new Date());
            setShowCalendar(false);

            setFlag(false);
            setShowMessage(true);
        }
    };

    const handleOKButtonClick = () => {
        setShowMessage(false);
        setFlag(false);
    };

    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    return (
        <>
            <Layout1
                content={
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
                                <h2>Búsqueda - Resultados</h2>
                            </div>
                            <button onClick={doVolver}>Volver a buscar</button>
                        </div>
                        <div className="linea2"></div>
                        <div className="seccion-info-busqueda">
                            <div className="titulo">
                                <h3>Resultados de la búsqueda: "{busqueda}"</h3>
                            </div>
                            <button onClick={doReservas}>Ver mis reservas</button>
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
                                            {checkboxesObj.titulo && <h3>{libro.titulo}</h3>}
                                        </div>
                                        <div className="imagenes-libro">

                                            {!isBotonDeshabilitado &&
                                                <a href={`/index/alumno/${usuario}/citasAlumno?ISBN13=${encodeURIComponent(libro.ISBN13)}&titulo=${encodeURIComponent(libro.titulo)}&usuario=${encodeURIComponent(usuario)}`}
                                                >
                                                    <img src="/media.png" alt="Icono XD" className="icono-xd"
                                                        style={{
                                                            width: '420px', 
                                                            maxHeight: '300px',
                                                        }} />
                                                    <img
                                                        src={libro["imagen-portada-url"]}
                                                        alt="Portada del libro"
                                                        className="portada-libro"
                                                        style={{
                                                            maxWidth: '100%', 
                                                            maxHeight: '300px',
                                                        }}
                                                    />
                                                </a>
                                            }
                                            {isBotonDeshabilitado &&
                                                <><img src="/media.png" alt="Icono XD" className="icono-xd" /><img
                                                    src={libro["imagen-portada-url"]}
                                                    alt="Portada del libro"
                                                    className="portada-libro" />
                                                </>
                                            }
                                        </div>
                                        <div className="informacion-libro">
                                            {checkboxesObj.autor && (
                                                <p>
                                                    <b>Autor:</b> <u>{libro.autor}</u>
                                                </p>
                                            )}
                                            {checkboxesObj.serie && (
                                                <p>
                                                    <b>Editorial:</b> {libro.editorial}
                                                </p>
                                            )}
                                            {checkboxesObj.isbn && (
                                                <p>
                                                    <b>ISBN13:</b> {libro.ISBN13}
                                                </p>
                                            )}
                                            {isBotonDeshabilitado &&
                                                <div className="MensajeNoDisp">No disponible</div>
                                            }
                                            {!isBotonDeshabilitado &&
                                                <button
                                                    onClick={() => reservar(libro)}
                                                >
                                                    Reservar
                                                </button>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="paginacion-2">
                            <button onClick={irAPaginaAnterior} disabled={paginaActual === 1}>
                                {'<'}
                            </button>
                            <button
                                onClick={irAPaginaSiguiente}
                                disabled={paginaActual === Math.ceil(coincidencias.length / resultadosPorPagina) - 1}
                            >
                                {'>'}
                            </button>
                        </div>
                        {flag && (
                            <div className="confirmacion-fondo">
                                <div className="seccion-confirmacion-2">
                                    <h1>Calendario</h1>
                                    
                                    <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} className="date"/>
                                    <p>Fecha seleccionada: {selectedDate.toDateString()}</p>
                                    <button className = "buttonfecha "  onClick={registrarReserva}>OK</button>
                                    <button className = "buttonfecha " onClick={() => setFlag(false)}>Cancel</button>
                                </div>
                            </div>
                        )}
                        {showMessage && (
                            <div className="confirmacion-fondo">
                            <div className="confirmacion-22">
                                <h1>Reserva Completada</h1>
                                <p>La reserva del recurso se ha realizado con éxito. Este debe ser devuelto hasta el día {formatDate(fechaentrega)}</p>
                                <h1></h1>
                                
                                    <button className="ok"  onClick={handleOKButtonClick}>OK</button>                                
                            </div>
                            </div>
                        )}
                    </>
                }
            />
        </>
    );
};

export default Principal;
