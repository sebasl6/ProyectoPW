import RepositoryBase from "../repository/base.js";
import modelo from '../modelo/libro.js';

const libroRepository = new RepositoryBase(modelo);

const findAll = async (req,res) => {

    const libroes = await libroRepository.findAll();

    return res.status(200).json(libroes);

}

const create = async (req,res) => {
    const result = await libroRepository.create(req.body);

    return res.status(200).json(result);
}

const findOne = async (req,res) => {
    const id = req.params.id;
    const result = await libroRepository.findOne(id);

    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'No encontrado.'})

}

const update = async (req,res) => {
    const result = await libroRepository.update(req.body);

    if (result)
        return res.status(200).json(result);
    else    
        return res.status(500).json({ message: 'No encontrado.'})
}

const remove = async (req,res) => {
    const id = req.params.id;
    
    const result = await libroRepository.remove(id);

    if (result)
        return res.status(200).json(result);
    else    
        return res.status(500).json({ message: 'No encontrado.'})
}

const libroController = { findAll, create, findOne, update, remove }

export default libroController;