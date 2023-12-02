import React, { useEffect, useState } from 'react';
import App from 'next/app';

import '../styles/estilos1.css';
import '../styles/estilos2.css';
import '../styles/estilos3.css';
import '../styles/estilos4.css';
import '../styles/estilos5.css';
import '../styles/estilos6.css';
import '../styles/cards.css';

import { DemoProvider } from './context/demo';
import alumnoApi from './api/alumno';  // Ajusta la ruta según tu estructura
import libroApi from './api/libro';  // Ajusta la ruta según tu estructura

function MyApp({ Component, pageProps }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchAndProcessReservations() {
      try {
        // Cambia la siguiente línea para usar tu nueva función de API
        const response = await alumnoApi.findAll();

        // Tu lógica para procesar las reservas aquí...
        const currentDate = new Date();
        const upcomingReservations = response.filter(reservation => new Date(reservation.fechaentrega) >= currentDate);

        // Cambia la siguiente línea para usar tu nueva función de API
        const writeResponse = await alumnoApi.add(upcomingReservations);
        console.log(writeResponse);

        setReservations(upcomingReservations);
      } catch (error) {
        console.error('Error al obtener y procesar las reservas:', error);
      }
    }

    fetchAndProcessReservations();
  }, []);

  return (
    <DemoProvider>
      <Component {...pageProps} reservations={reservations} />
    </DemoProvider>
  );
}

export default MyApp;
