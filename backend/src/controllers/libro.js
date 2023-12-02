import RepositoryBase from "../repository/base.js";
import modelo from '../modelo/libro.js'; // Ajusta la ruta y el nombre del modelo según corresponda

const libroRepository = new RepositoryBase(modelo);

const findAll = async (req, res) => {
  const libros = await libroRepository.findAll();
  return res.status(200).json(libros);
}

const create = async (req, res) => {
  const result = await libroRepository.create(req.body);
  return res.status(200).json(result);
}

const findOne = async (req, res) => {
  const id = req.params.id;
  const result = await libroRepository.findOne(id);

  if (result)
    return res.status(200).json(result);
  else
    return res.status(500).json({ message: 'No encontrado.' });
}

const update = async (req, res) => {
  const result = await libroRepository.update(req.body);

  if (result)
    return res.status(200).json(result);
  else    
    return res.status(500).json({ message: 'No encontrado.' });
}

const remove = async (req, res) => {
  const id = req.params.id;
  
  const result = await libroRepository.remove(id);

  if (result)
    return res.status(200).json(result);
  else    
    return res.status(500).json({ message: 'No encontrado.' });
}

// Nuevo método para buscar libros por autor
const findLibrosByAutor = async (req, res) => {
  const autor = req.params.autor;
  const libros = await libroRepository.findLibrosByAutor(autor);

  if (libros)
    return res.status(200).json(libros);
  else
    return res.status(500).json({ message: 'Error al buscar libros por autor.' });
}

// Nuevo método para buscar libros por título
const findLibrosByTitulo = async (req, res) => {
  const titulo = req.params.titulo;
  const libros = await libroRepository.findLibrosByTitulo(titulo);

  if (libros)
    return res.status(200).json(libros);
  else
    return res.status(500).json({ message: 'Error al buscar libros por título.' });
}

const libroController = { findAll, create, findOne, update, remove, findLibrosByAutor, findLibrosByTitulo };

export default libroController;
