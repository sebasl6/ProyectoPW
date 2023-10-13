import Link from 'next/link';
import Head from 'next/head';
import LayoutcasoCita from '@/components/LayoutcasoCita';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import libraryData from 'src/datos/library.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PaginaDestino = () => {
    // Obtiene el objeto router
    const router = useRouter();
    const { ISBN13, titulo, usuario } = router.query;

    // Define un estado para el libro
    const [libro, setLibro] = useState(null);

    // useEffect para buscar el libro por ISBN13 cuando se monta el componente
    useEffect(() => {
        if (ISBN13) {
            // Busca el libro en el archivo JSON library.json
            const libroEncontrado = libraryData.find(item => item.ISBN13 === ISBN13);

            // Actualiza el estado con el libro encontrado
            setLibro(libroEncontrado);
        }
    }, [ISBN13]);


    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const cambiar = () => {
        setShowCalendar(!showCalendar);
    };

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
    const [fechaentrega, setFechaEntrega] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const registrarReserva = async () => {
        // Crea un objeto de reserva con la fecha, usuario y título del libro
        const fechaEntrega = new Date(selectedDate);
        fechaEntrega.setDate(fechaEntrega.getDate() + 30);
        setFechaEntrega(fechaEntrega.toDateString());
        const reserva = {
            fecha: selectedDate.toISOString(),
            usuario: usuario,
            ISBN13: ISBN13,
            titulo: titulo,
            disponibilidad: 1,
            fechaentrega: fechaEntrega.toISOString(),
        };

        // Agrega la nueva reserva al arreglo existente
        const updatedReservas = [...reservas, reserva]; // Usar `reservas` en lugar de `datos`

        // Actualiza el estado de las reservas con las reservas actualizadas
        setReservas(updatedReservas);

        // Realiza una solicitud POST a la API para agregar la reserva
        try {
            const response = await fetch('/api/actualizarReserva/escribir', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedReservas), // Usar `updatedReservas` en lugar de `datos`
            });
            // Después de realizar la reserva, obtén las reservas actualizadas
            obtenerReservas();
        } catch (error) {
            console.error('Error al realizar la solicitud API:', error);
        }


        setShowCalendar(false);
        setShowMessage(true);
    };


    const handleOKButtonClick = () => {
        setShowMessage(false);
        router.back();
    };

    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }


    return (
        <LayoutcasoCita content={
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
                        <h2>Citas</h2>
                    </div>
                </div>
                <div className="linea2"></div>
                <div className='seccionInfoLibro'>
                    <div className='infoizquierda'>
                        <div className='izqheader'>
                            <p>{libro?.titulo}</p>
                        </div>
                        <div className='debajoheader'>
                            <div className='imagen-portada-2'>
                                <img
                                    src={libro?.["imagen-portada-url"]}
                                    alt="Portada del libro"
                                    className="portada-libro-2"
                                />
                            </div>
                            <p>{libro?.descripcion}</p>
                        </div>
                    </div>
                    <div className='infoderecha'>
                        <div className='infochikita'>
                            <h4>Disponible</h4>
                        </div>
                        <h8>Editorial</h8>
                        <p>{libro?.editorial}</p>
                    </div>
                </div>
                <div className="seccion-titulo-resultados">
                    <div className="titulo">
                        <h3>Reservar</h3>
                    </div>
                </div>
                <div className="linea2"></div>
                <div className="input-container">
                    <label className="form-label-9" htmlFor="fecha">Ingresa una Fecha limite</label>
                    <input className="form-input-9"
                        type="text" id="fecha" name="contrasena"
                        value={selectedDate ? selectedDate.toLocaleDateString('es-ES') : ''}
                        readOnly // Para que el campo sea de solo lectura
                    />
                    <div className='circuloXd'>
                        <img src='/today_24px.png' onClick={toggleCalendar}></img>
                    </div>
                </div>
                <div className="mensajito">
                    <h6>DD/MM/YYYY</h6>
                </div>
                <div className="boton-citas">
                    <button onClick={registrarReserva}>Reservar</button>
                </div>
                {showCalendar && (
                    <>
                        <div className="confirmacion-fondo">
                            <div className="seccion-confirmacion-2">
                                <h1>Seleccion Fecha</h1>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                />
                                <h1></h1>
                                <button className="buttonfecha" onClick={cambiar}>OK</button>
                            </div>
                        </div>
                    </>
                )}
                {showMessage && (
                    <div className="confirmacion-fondo">
                        <div className="confirmacion-22">
                            <h1>Reserva Completada</h1>
                            <p>La reserva del recurso se ha realizado con éxito. Este debe ser devuelto hasta el día {formatDate(fechaentrega)}</p>
                            <h1></h1>
                            <div className='ok'>
                                <button onClick={handleOKButtonClick}>OK</button>
                            </div>

                        </div>
                    </div>
                )}

            </>
        }></LayoutcasoCita>

    );
};

export default PaginaDestino;
