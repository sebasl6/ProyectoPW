import { writeFile } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Solo funciona con POST !!' });
  } else {
    // Leer los valores recibidos
    console.log('BODY:', req.body);
    const body = JSON.stringify(req.body).replace("'", '"');
    const params = JSON.parse(body);

    try {
      // Ruta al archivo donde deseas guardar los datos
      const filePath = join(process.cwd(), 'datos', 'src/datos/usuarios.json');

      // Escribir en el archivo
      await writeFile(filePath, JSON.stringify(params));

      res.status(200).json({
        rpta: 'Datos grabados en archivo',
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'Error al escribir en el archivo',
      });
    }
  }
}
