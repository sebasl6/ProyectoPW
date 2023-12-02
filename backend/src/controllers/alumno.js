// controllers/alumnoController.js
import RepositoryBase from "../repository/base.js";
import modelo from '../modelo/alumno.js';

const alumnoRepository = new RepositoryBase(modelo);

const findAll = async (req, res) => {
  const alumnos = await alumnoRepository.findAll();
  return res.status(200).json(alumnos);
}

const create = async (req, res) => {
  const result = await alumnoRepository.create(req.body);
  return res.status(200).json(result);
}

const findOne = async (req, res) => {
  const id = req.params.id;
  const result = await alumnoRepository.findOne(id);

  if (result)
    return res.status(200).json(result);
  else
    return res.status(500).json({ message: 'No encontrado.' });
}

const update = async (req, res) => {
  const result = await alumnoRepository.update(req.body);

  if (result)
    return res.status(200).json(result);
  else    
    return res.status(500).json({ message: 'No encontrado.' });
}

const remove = async (req, res) => {
  const id = req.params.id;
  
  const result = await alumnoRepository.remove(id);

  if (result)
    return res.status(200).json(result);
  else    
    return res.status(500).json({ message: 'No encontrado.' });
}

// Nuevo método para buscar alumno por correo
const findAlumnoByCorreo = async (req, res) => {
  const correo = req.params.correo;
  const alumno = await alumnoRepository.findOneByCorreo(correo);

  if (alumno)
    return res.status(200).json(alumno);
  else
    return res.status(500).json({ message: 'Error al buscar alumno por correo.' });
}

const login = async (req, res) => {
  const { usuario, contrasena } = req.body;
  console.log(req.body);
  try{
    const user = await findOne({where:{ correo: usuario}});
    if ( user && user.password ===contrasena){
      res.json({succes: true, tipo_usuario: user.tipo_usuario});
    }else{

    }
  }catch{
    
  }
}
const alumnoController = { findAll, create, findOne, update, remove, findAlumnoByCorreo, login };

export default alumnoController;
