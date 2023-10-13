import '../styles/estilos1.css'
import '../styles/estilos2.css'
import '../styles/estilos3.css'
import '../styles/estilos4.css'
import '../styles/estilos5.css'
import '../styles/estilos6.css'
import '../styles/cards.css'

import { AppProps } from 'next/app'
import { DemoProvider } from 'src/pages/context/demo'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';

export default function MyApp({ Component, pageProps }) {
  const [datos, setDatos] = useState([]);

  async function escribir() {
    const opciones1 = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const peticion2 = await fetch('/api/actualizarReserva/leer', opciones1);
    let data = await peticion2.json();
    const fechaActual = new Date();
    const reservasFiltradas = data.filter(reserva => new Date(reserva.fechaentrega) >= fechaActual);

    const opciones = {
      method: 'POST',
      body: JSON.stringify(reservasFiltradas), 
      headers: { 'Content-Type': 'application/json' }
    }

    const peticion = await fetch('/api/actualizarReserva/escribir', opciones);
    let rpta = await peticion.json();
    console.log(rpta);
    setDatos(reservasFiltradas);
  }

  useEffect(() => {
    escribir();
  }, []);

  return (
    <DemoProvider>
      <Component {...pageProps} />
    </DemoProvider>
  );
}
