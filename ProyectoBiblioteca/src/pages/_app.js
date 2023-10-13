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

function MyApp({ Component, pageProps }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchAndProcessReservations() {
      try {
        const fetchDataOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch('/api/actualizarReserva/leer', fetchDataOptions);
        const rawData = await response.json();

        const currentDate = new Date();
        const upcomingReservations = rawData.filter(reservation => new Date(reservation.fechaentrega) >= currentDate);

        const writeDataOptions = {
          method: 'POST',
          body: JSON.stringify(upcomingReservations),
          headers: { 'Content-Type': 'application/json' },
        };

        const writeResponse = await fetch('/api/actualizarReserva/escribir', writeDataOptions);
        const result = await writeResponse.json();
        console.log(result);

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
