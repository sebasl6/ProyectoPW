import RepositoryBase from "../repository/base.js";
import modelo from '../modelo/autor.js';

const autorRepository = new RepositoryBase(modelo);

const findAll = async (req,res) => {

    const autores = await autorRepository.findAll();

    return res.status(200).json(autores);

}

const create = async (req,res) => {
    const result = await autorRepository.create(req.body);

    return res.status(200).json(result);
}

const findOne = async (req,res) => {
    const id = req.params.id;
    const result = await autorRepository.findOne(id);

    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'No encontrado.'})

}

const update = async (req,res) => {
    const result = await autorRepository.update(req.body);

    if (result)
        return res.status(200).json(result);
    else    
        return res.status(500).json({ message: 'No encontrado.'})
}

const remove = async (req,res) => {
    const id = req.params.id;
    
    const result = await autorRepository.remove(id);

    if (result)
        return res.status(200).json(result);
    else    
        return res.status(500).json({ message: 'No encontrado.'})
}

const autorController = { findAll, create, findOne, update, remove }

export default autorController;