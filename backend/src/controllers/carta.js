import RepositoryBase from "../repository/base.js";
import modelo from '../modelo/carta.js';

const cartaRepository = new RepositoryBase(modelo);

const findAll = async (req,res) => {

    const cartaes = await cartaRepository.findAll();

    return res.status(200).json(cartaes);

}

const create = async (req,res) => {
    const result = await cartaRepository.create(req.body);

    return res.status(200).json(result);
}

const findOne = async (req,res) => {
    const id = req.params.id;
    const result = await cartaRepository.findOne(id);

    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'No encontrado.'})

}

const update = async (req,res) => {
    const result = await cartaRepository.update(req.body);

    if (result)
        return res.status(200).json(result);
    else    
        return res.status(500).json({ message: 'No encontrado.'})
}

const remove = async (req,res) => {
    const id = req.params.id;
    
    const result = await cartaRepository.remove(id);

    if (result)
        return res.status(200).json(result);
    else    
        return res.status(500).json({ message: 'No encontrado.'})
}

const cartaController = { findAll, create, findOne, update, remove }

export default cartaController;